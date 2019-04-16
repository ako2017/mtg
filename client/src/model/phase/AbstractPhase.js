class AbstractPhase extends Observable{
	constructor(pm, phaseId) {
		super();
		this.pm=pm;
		this.phaseId = phaseId;
	}

	execute() {
	}
	
	valid(player) {
	}
	
	end() {
	}

	/**
	 * Retourne les joueurs de la partie
	 * @returns  {Player} les joueurs de la partie
	 */
	getPlayers() {
		return this.pm.game.players;
	}

	isAuthorized(action, data) {
		return false;
	}

	next(phaseId) {
		this.pm._next = phaseId;
	}

}