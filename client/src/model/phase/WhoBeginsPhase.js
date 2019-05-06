class WhoBeginsPhase extends AbstractPhase {
	constructor(pm) {
		super(pm, PHASE.WHO_BEGINS);
	}

	execute() {
		this.setPlayerActif();
		sendEvent(GameEvent.WHO_BEGIN,this.getPlayerActif(),this);
		return PHASE.DEGAGEMENT;
	}

	setPlayerActif() {
		this.game.playerActif = Math.floor((Math.random() * 10))%2;
		this.game.token = this.game.playerActif;
		this.game.getPlayerActif().canPioche = false;
	}

	getPlayerActif() {
		return this.game.getPlayerActif();
	}
	
	valid(player) {
		return PHASE.WAIT;
	}
	
	end() {
	}
	
}