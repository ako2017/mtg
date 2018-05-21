Game = function() {
	Observable.call(this);
	this.pm = new PhaseManager(this);
	this.playerActif = 0;
	this.token = 0;
	this.stack = new Stack();
	this.players = [];
	this.selectedCards = [];
	this.state;
};

Game.prototype = new Observable();

Game.prototype.addPlayer = function(player) {
	if (this.players.length < 2) {
		player.game = this;
		this.players.push(player);
	}
};

Game.prototype.isFull = function() {
	return this.players.length == 2;
};

Game.prototype.start = function() {
	this.pm.start();
};

Game.prototype.checkAllPass = function() {
	for (var i = 0; i < this.players.length; i++) {
		var player = this.players[i];
		if (!player.hasPass)
			return false;
	}
	return true;
};

Game.prototype.endOfGame = function() {
	for (var i = 0; i < this.players.length; i++) {
		if (this.players[i].life<0)
			return true;
	}
	return false;
};

Game.prototype.unPassAll = function() {
	for (var i = 0; i < this.players.length; i++) {
		this.players[i].hasPass = false;
	}
};

Game.prototype.isPlayerActif = function(player) {
	return this.getPlayerActif().name == player.name;
};

Game.prototype.isPlayerWithToken = function(player) {
	return this.getPlayerWithToken().name == player.name;
};

Game.prototype.getPlayerWithToken = function() {
	return this.players[this.token];
};

Game.prototype.getPlayerActif = function() {
	return this.players[this.playerActif];
};

Game.prototype.getPlayerNonActif = function() {
	return this.players[(this.playerActif + 1) % this.players.length];
};

Game.prototype.nextPlayer = function() {
	this.playerActif = (this.playerActif + 1) % this.players.length;
	var event = {};
	event.type = GameEvent.NEXT_PLAYER;
	event.data = this.getPlayerActif();
	this.notify(event);
};

Game.prototype.nextToken = function() {
	this.token = (this.token + 1) % this.players.length;
	var event = {};
	event.type = GameEvent.NEXT_TOKEN;
	event.data = this.getPlayerWithToken();
	this.notify(event);
};

Game.prototype.valid = function(player) {
	player.valid();
};

Game.prototype.poseCard = function(player, card) {
	if (this.stack.needCible()) {
		sendEvent(GameEvent.ERROR,"cible requise",this);
		return;
	}
	if (!this.isPlayerWithToken(player)) {
		sendEvent(GameEvent.ERROR,"vous n'avez pas la main",this);
		return;
	}
	if (player.poseCard(card, this.stack)) {
		if (this.stack.needCible()) {
			event.type = GameEvent.NEED_CIBLE;
			this.notify(event);
			this.state = State.NEED_CIBLE;
		}
	}
};

Game.prototype.retirerCard = function(player, card) {
	player.retirerCard(card);
};

Game.prototype.muligane = function(player) {
	player.muligane();		
};

Game.prototype.declareAttaquant = function(player,card) {
	player.declareAttaquant(card);		
};

Game.prototype.declareBloqueur = function(player,card,cardBlocked) {
	player.declareBloqueur(card,cardBlocked);	
};

Game.prototype.validCible = function(player, cards) {
	if (this.state != State.NEED_CIBLE)
		return;
	var event = {};
	if (this.isPlayerWithToken(player)) {
		if (this.stack.validCible(cards)) {
			this.state = null;
		}
	}
};
