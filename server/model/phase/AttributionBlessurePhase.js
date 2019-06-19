const PHASE = require('../Constantes').PHASE;
const GameEvent = require('../Constantes').GameEvent;
const AbstractPhase = require('./AbstractPhase');

class AttributionBlessurePhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.ATTRIBUTION_BLESSURE);
	}
	
	execute() {
		var game = this.game;
		this.game.getPlayerActif().attaquants.forEach(function(card) {
			card.attack(game.getPlayerNonActif());
		});
		this.game.addCapacitiesByTrigger();
		return  PHASE.WAIT;
	}

	valid(player) {
		this.game.pass(player);
		if (this.game.checkAllPass()) {
			return PHASE.PRINCIPALE;
		}
		return  PHASE.WAIT;
	}

	end() {
	}

	isAuthorized(action, data) {
		if('poseCard' == action) {
			if(this.game.isPlayerWithToken(data.player) && (data.card.type == TypeCard.EPHEMERE || data.card.type == TypeCard.CAPACITY) && data.player.canPoseCard(data.card)) {
				return true;
			}
		}
		else if('valid' == action) {
			if(this.game.isPlayerWithToken(data.player))
				return true;
		}
		return false;
	}
	
}

module.exports = AttributionBlessurePhase;