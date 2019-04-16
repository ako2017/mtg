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
		this.pm.game.playerActif = Math.floor((Math.random() * 10))%2;
		this.pm.game.token = this.pm.game.playerActif;
		this.pm.game.getPlayerActif().canPioche = false;
	}

	getPlayerActif() {
		return this.pm.game.getPlayerActif();
	}
	
	valid(player) {
		return false;
	}
	
	end() {
	}
	
}