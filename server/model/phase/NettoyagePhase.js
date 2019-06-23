const PHASE = require('../Constantes').PHASE;
const GameEvent = require('../Constantes').GameEvent;
const AbstractPhase = require('./AbstractPhase');

class NettoyagePhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.NETTOYAGE);
	}

	execute() {	
		if (this.game.getPlayerActif().hand.length > 7) {
			sendEvent(GameEvent.RETIRER_CARD,this.game.getPlayerActif(),this.game);
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
			sendEvent(GameEvent.RETIRER_CARD,player,this.game);
		}
		return PHASE.WAIT;
	}
	
	end() {
		this.game.getPlayerNonActif().newTurn();
		this.game.getPlayerActif().battlefield.forEach(function(card, index) {
			card.restaure();
		},this);
		this.game.pm.phases[PHASE.PRINCIPALE].phaseNum = 0;
		this.game.nextPlayer();
		this.game.nextToken();
	}

	isAuthorized(action, data) {
		if('retirerCard' == action) {
			if(this.game.isPlayerActif(data.player) && this.game.getPlayerActif(data.player).hand.length >7 && this.game.getPlayerActif(data.player).hand.contains(data.card)) {
				return true;
			}
		}
		else if('valid' == action) {
			return this.game.isPlayerActif(data.player);
		}
		return false;
	}

}

module.exports = NettoyagePhase;