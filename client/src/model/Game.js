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

Game.prototype.nextPlayer = function() {
	this.playerActif = (this.playerActif + 1) % this.players.length;
};

Game.prototype.nextToken = function() {
	this.token = (this.token + 1) % this.players.length;
	var event = {};
	event.type = GameEvent.NEXT_TOKEN;
	event.data = this.getPlayerWithToken();
	this.notify(event);
};

Game.prototype.valid = function(player) {
	if (this.pm.valid(player)) {
		if (!this.stack.isEmpty()) {
			this.stack.resolve(this);
		} else {
			this.pm.next();
		}
	}
};

Game.prototype.poseCard = function(player, card) {
	var event = {};
	if (!this.isPlayerWithToken(player)) {
		event.type = GameEvent.ERROR;
		event.data = "vous n'avez pas la main";
		this.notify(event);
		return;
	}
	if (player.poseCard(card, this.stack)) {
		if(card.type == TypeCard.TERRAIN) {
			this.stack.addCapacitiesByTrigger(GameEvent.ON_ENTER_BATTLEFIELD,card, this.players);
		}
		if (this.stack.needCible()) {
			event.type = GameEvent.NEED_CIBLE;
			this.notify(event);
			this.state = State.NEED_CIBLE;
		}
	}
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

Game.prototype.muligane = function(player) {
	player.muligane();
};