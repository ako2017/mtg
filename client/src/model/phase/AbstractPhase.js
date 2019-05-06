class AbstractPhase extends Observable{
	constructor(pm, phaseId) {
		super();
		this.pm=pm;
		this.game = game;
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
		return this.game.players;
	}

	isAuthorized(action, data) {
		return false;
	}

	getPlayerActif() {
		return this.game.getPlayerActif();
	}

	/**
	 * Vérifie si tous les joueurs on passé leur tour
	 * @returns {boolean} true si c'est le cas false sinon
	 */
	checkAllPass() {
		for (var i = 0; i < this.game.players.length; i++) {
			var player = this.game.players[i];
			if (!player.hasPass)
				return false;
		}
		return true;
	}

	needCheckStack() {
		return this.ischeckStack;
	}

}