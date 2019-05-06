class NettoyagePhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.NETTOYAGE);
	}

	execute() {	
		if (this.game.getPlayerActif().hand.length > 7) {
			sendEvent(GameEvent.RETIRER_CARD,null,this.game);
			return PHASE.WAIT;
		} else {
			return PHASE.DEGAGEMENT;
		}
	}
	
	valid(player) {
		if(this.game.isPlayerActif(player) && player.hand.length <=7) {
			return PHASE.DEGAGEMENT;
		}
		return PHASE.WAIT;
	}
	
	end() {
		this.game.getPlayerActif().battlefield.forEach(function(card, index) {
			card.restaure();
		},this);		
		this.game.getPlayerNonActif().battlefield.forEach(function(card, index) {
			card.restaure();
		},this);
		this.game.getPlayerActif().newTurn();
		this.pm.phases[PHASE.PRINCIPALE].phaseNum = 0;
	}

	isAuthorized(action, data) {
		if('retirerCard' == action) {
			if(this.game.isPlayerActif(data.player)) {
				if(data.player.hand.length > 7) {
					return true;
				}
			}
		}
		else if('valid' == action) {
			if(this.game.isPlayerActif(data.player)) {
				return true;
			}
		}
		return false;
	}

}