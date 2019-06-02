class Game extends Observable {
	constructor() {
		super();
		this.pm = this.createPhaseManager();
		this.playerActif = 0;
		this.token = 0;
		this.stack = new Stack();
		this.players = [];
		this.selectedCards = [];
		this.state;
		this.maxPlayer = 2;
	}

	createPhaseManager() {
		var pm = new PhaseManager(this);
		var phases = [];
		phases[PHASE.DISTRIBUTION] = new DistributionPhase(pm);
		phases[PHASE.WHO_BEGINS] = new WhoBeginsPhase(pm);
		phases[PHASE.DEGAGEMENT] = new DegagementPhase(pm);
		phases[PHASE.ENTRETIENT] = new EntretientPhase(pm);
		phases[PHASE.PIOCHE] = new PiochePhase(pm);
		phases[PHASE.PRINCIPALE] = new PrincipalePhase(pm);
		phases[PHASE.DECLARATION_ATTAQUANT] = new DeclarationAttaquantPhase(pm);
		phases[PHASE.DECLARATION_BLOQUEUR] = new DeclarationBloqueurPhase(pm);
		phases[PHASE.ATTRIBUTION_BLESSURE] = new AttributionBlessurePhase(pm);
		phases[PHASE.FIN] = new FinPhase(pm);
		phases[PHASE.NETTOYAGE] = new NettoyagePhase(pm);
		pm.initPhases(phases);
		return pm;
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

	getPlayers() {
		return this.players;
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

	pass(player) {
		player.pass();
		this.nextToken();
	}

	nextToken() {
		this.token = (this.token + 1) % this.players.length;
		sendEvent(GameEvent.NEXT_TOKEN,this.getPlayerWithToken(),this);
	}

	valid(player) {
		if(!this.isAuthorized('valid',{player:player})) 
			return false;
		this.pm.valid(player);
		if(this.needResolve()) {
			this.stack.resolve(game);
			if(this.stack.hasCapacityToAdd()) {
				this.stack.addCapacityUntilWait();
			}
		}
		else if(this.pm.canGoNext()) {
			do {} while(this.pm.next());
		}
	}

	needResolve() {
		return this.checkAllPass() && !this.stack.isEmpty();
	}

	poseCard(player, card) {
		if(!this.isAuthorized('poseCard',{player:player, card:card})) 
			return false;
		player.poseCard(card, this.stack);
		this.unPassAll(player);
		return true;
	}

	retirerCard(player, card) {
		if(!this.isAuthorized('retirerCard',{player:player, card:card})) 
			return false;
		player.retirerCard(card);
	}

	declareAttaquant(player, card) {
		if(!this.isAuthorized('declareAttaquant',{player:player, card:card})) 
			return false;
		player.declareAttaquant(card);
	}

	setEffectNumber(player, effectNumber) {
		if(this.isAuthorized('setEffectNumber', player)) {
			if(this.stack.setEffectNumber(effectNumber)) {
				this.stack.resolve();
			}
		}	
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

	setCible(player, cards) {
		if(this.isAuthorized('setCible', player)) {
			if(this.stack.setCible(cards)) {
				this.stack.addCapacityUntilWait();
			}
		}
		return false;
	}

	isAuthorized(action, data) {
		if(action == 'setCible') {
			return this.isPlayerWithToken(data) && this.stack.needCible();
		}
		else if(action == 'setEffectNumber') {
			return this.isPlayerWithToken(data) && this.stack.needEffectNumber();
		}
		if(this.stack.waitInfo().return)
			return false;
		return this.pm.isAuthorized(action, data);
	}
}