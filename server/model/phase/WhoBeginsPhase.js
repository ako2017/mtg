const PHASE = require('../Constantes').PHASE;
const GameEvent = require('../Constantes').GameEvent;
const AbstractPhase = require('./AbstractPhase');

class WhoBeginsPhase extends AbstractPhase {
	constructor(pm) {
		super(pm, PHASE.WHO_BEGINS);
	}

	execute() {
		this.setPlayerActif();
		sendEvent(GameEvent.WHO_BEGIN,this.game.getPlayerActif(),this.game);
		return PHASE.DEGAGEMENT;
	}

	setPlayerActif() {
		this.game.playerActif = Math.floor((Math.random() * 10))%2;
		this.game.token = this.game.playerActif;
		this.game.getPlayerActif().canPioche = false;
	}
	
	valid(player) {
		return PHASE.WAIT;
	}
	
	end() {
	}
	
}

module.exports = WhoBeginsPhase;