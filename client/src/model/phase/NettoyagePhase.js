class NettoyagePhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.NETTOYAGE);
	}

	execute() {	
		if (this.game.getPlayerActif().hand.length > 7) {
			sendEvent(GameEvent.RETIRER_CARD,null,this);
			return PHASE.WAIT;
		} else {
			return PHASE.DEGAGEMENT;
		}
	}
	
	valid(player) {
		if(player.hand.length <=7) {
			return PHASE.DEGAGEMENT;
		}
		else {
			sendEvent(GameEvent.RETIRER_CARD,null,this);
		}
		return PHASE.WAIT;
	}
	
	end() {
		this.game.getPlayerActif().newTurn();
		this.game.getPlayerNonActif().battlefield.forEach(function(card, index) {
			card.restaure();
		},this);
		this.phases[PHASE.PRINCIPALE].phaseNum = 0;
	}

	isAuthorized(action, data) {
		if('retirerCard' == action) {
			if(this.game.isPlayerActif(data.player)) {
				return true;
			}
		}
		else if('valid' == action) {
			return this.game.isPlayerActif(data.player);
		}
		return false;
	}

}