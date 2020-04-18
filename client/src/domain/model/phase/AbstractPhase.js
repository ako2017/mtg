class AbstractPhase extends Observable{
	constructor(pm, phaseId) {
		super();
		this.pm=pm;
		this.game = pm.game;
		this.phaseId = phaseId;
		this.ischeckStack = false;
	}

	execute() {
	}
	
	valid(player) {
	}
	
	end() {
	}

	isAuthorized(action, data) {
		return false;
	}

}