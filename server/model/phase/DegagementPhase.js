const PHASE = require('../Constantes').PHASE;
const GameEvent = require('../Constantes').GameEvent;
const AbstractPhase = require('./AbstractPhase');

class DegagementPhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.DEGAGEMENT);
	}

	execute() {
		var player = this.game.getPlayerActif();
		for(var i = 0; i < player.battlefield.length; i++) {
			player.battlefield[i].degage();
		}
		for(var i = 0; i < player.terrains.length; i++) {
			player.terrains[i].degage();
		}
		return PHASE.ENTRETIENT;
	}
	
	valid(player) {
		return PHASE.WAIT;
	}
	
	end() {
	}

}

module.exports = DegagementPhase;