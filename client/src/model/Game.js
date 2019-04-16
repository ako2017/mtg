class Game extends Observable {
	constructor() {
		this.pm = new PhaseManager(this);
		this.playerActif = 0;
		this.token = 0;
		this.stack = new Stack();
		this.players = [];
		this.selectedCards = [];
		this.state;
		this.maxPlayer = 2;
	}

	/**
	 * Ajoute un joueur au jeu si possible
	 * @param {Player} player le joueur à ajouter
	 * @returns {boolean} true si le joueur a été ajouté false sinon
	 */
	addPlayer(player) {
		if (this.players.length < this.maxPlayer) {
			this.players.push(player);
			sendEvent(GameEvent.ADD_PLAYER,player,this);
			return true;
		}
		return false;
	}

	/**
	 * Vérifie si le nombre de joueur est atteint
	 * @returns {boolean} true si le nombre de joueur est atteint false sinon
	 */
	isFull() {
		return this.players.length == this.maxPlayer;
	}

	start() {
		this.pm.start();
	}

	/**
	 * Vérifie si tous les joueurs on passé leur tour
	 * @returns {boolean} true si c'est le cas false sinon
	 */
	checkAllPass() {
		for (var i = 0; i < this.players.length; i++) {
			var player = this.players[i];
			if (!player.hasPass)
				return false;
		}
		return true;
	}

	endOfGame() {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].life<0)
				return true;
		}
		return false;
	}

	unPassAll(player) {
		for (var i = 0; i < this.players.length; i++) {
			if(player && this.players[i] == player) continue;
			this.players[i].hasPass = false;
		}
	}

	isPlayerActif(player) {
		return this.getPlayerActif().name == player.name;
	}

	isPlayerWithToken(player) {
		return this.getPlayerWithToken().name == player.name;
	}

	getPlayerWithToken() {
		return this.players[this.token];
	}

	getPlayerActif() {
		return this.players[this.playerActif];
	}

	getPlayerNonActif() {
		return this.players[(this.playerActif + 1) % this.players.length];
	}

	nextPlayer() {
		this.playerActif = (this.playerActif + 1) % this.players.length;
		var event = {};
		event.type = GameEvent.NEXT_PLAYER;
		event.data = this.getPlayerActif();
		this.notify(event);
	}

	pass(player) {
		if(!this.isAuthorized('pass',{player:player})) 
			return false;
		player.hasPass = true;
		this.nextToken();
	}

	nextToken() {
		this.token = (this.token + 1) % this.players.length;
		sendEvent(GameEvent.NEXT_TOKEN,this.getPlayerWithToken(),this);
	}

	valid(player) {
		if(!this.isAuthorized('valid',{player:player})) 
			return false;
		if (this.pm.valid(player)) {
			this.unPassAll();
			if (!this.stack.isEmpty()) {
				this.unPassAll();
				this.stack.resolve(this);
			} else {
				this.pm.next();
			}
		}
	}

	poseCard(player, card) {
		if(!this.isAuthorized('poseCard',{player:player, card:card})) 
			return false;
		player.poseCard(card, this.stack);
		this.unPassAll(player);
	}

	/**
	 * 
	 * @param {*} player 
	 */
	muligane(player) {
		if(this.isAuthorized('muligane', player)) {
			player.muligane();
		}
	}

	validCible(player, cards) {
		if (this.state != State.NEED_CIBLE)
			return;
		var event = {};
		if (this.isPlayerWithToken(player)) {
			if (this.stack.validCible(cards)) {
				this.state = null;
			}
		}
	}

	isAuthorized(action, data) {
		return this.pm.isAuthorized(action, data);
	}
}