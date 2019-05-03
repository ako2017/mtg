class NettoyagePhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.NETTOYAGE);
	}

	execute() {	
		if (this.pm.game.getPlayerActif().hand.length > 7) {
			sendEvent(GameEvent.RETIRER_CARD,null,this.pm.game);
			return PHASE.WAIT;
		} else {
			return PHASE.DEGAGEMENT;
		}
	}
	
	valid(player) {
		if(this.pm.game.isPlayerActif(player) && player.hand.length <=7) {
			return PHASE.DEGAGEMENT;
		}
		return PHASE.WAIT;
	}
	
	end() {
		this.pm.game.getPlayerActif().battlefield.forEach(function(card, index) {
			card.restaure();
		},this);		
		this.pm.game.getPlayerNonActif().battlefield.forEach(function(card, index) {
			card.restaure();
		},this);
		this.pm.game.getPlayerActif().newTurn();
		this.pm.phases[PHASE.PRINCIPALE].phaseNum = 0;
	}

	isAuthorized(action, data) {
		if('retirerCard' == action) {
			if(this.pm.game.isPlayerActif(data.player)) {
				if(data.player.hand.length > 7) {
					return true;
				}
			}
		}
		else if('valid' == action) {
			if(this.pm.game.isPlayerActif(data.player)) {
				return true;
			}
		}
		return false;
	}

}