class AbstractPhase extends Observable{
	constructor(pm, phaseId) {
		super();
		this.pm=pm;
		this.phaseId = phaseId;
		this.ischeckStack = false;
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

	pass(player) {
		this.pm.game.pass(player);
	}

	getPlayerActif() {
		return this.pm.game.getPlayerActif();
	}

	/**
	 * Vérifie si tous les joueurs on passé leur tour
	 * @returns {boolean} true si c'est le cas false sinon
	 */
	checkAllPass() {
		for (var i = 0; i < this.pm.game.players.length; i++) {
			var player = this.pm.game.players[i];
			if (!player.hasPass)
				return false;
		}
		return true;
	}

	checkStack() {
		return this.ischeckStack;
	}

}