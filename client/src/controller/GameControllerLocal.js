GameControllerLocal = function(service) {
	this.service = service;
	this.gameList = [];
};

GameControllerLocal.prototype.createGame = function(socket) {
	var game = this.service.createGame();
	this.gameList.push(game);
	this.addPlayer(socket, this.gameList.length -1);
};

GameControllerLocal.prototype.addPlayer() = function(socket, gameId) {
	if(this.isPlayer()) return;
	var player = this.service.addPlayer(this.getGameById(gameId));
	if(player != null) {
		socket.player = player;
		socket.game = this.getGameById(socket.gameId);
	}
};

GameControllerLocal.prototype.muligane() = function(socket) {
	if(!this.isPlayer()) return;
	this.service.muligane(socket.game,socket.player);
};

GameControllerLocal.prototype.poseCard() = function(socket, cardId) {
	if(!this.isPlayer()) return;
	this.service.poseCard(socket.game,socket.player, socket.player.getCardById(cardId));
};

GameControllerLocal.prototype.valid() = function(socket) {
	if(!this.isPlayer()) return;
	this.service.valid(socket.game,socket.player);
};

GameControllerLocal.prototype.getGameById = function(id) {
	return this.gameList[id];
};

GameControllerLocal.prototype.isPlayer() = function(socket) {
	return socket.game != null;
};