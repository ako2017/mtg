GameController = function(service) {
	this.service = service;
	this.gameList = [];
};

GameController.prototype.createGame = function(socket) {
	var game = this.service.createGame();
	this.gameList.push(game);
	this.addPlayer(socket, this.gameList.length -1);
};

GameController.prototype.addPlayer() = function(socket, gameId) {
	if(this.isPlayer()) return;
	var player = this.service.addPlayer(this.getGameById(gameId));
	if(player != null) {
		socket.player = player;
		socket.game = this.getGameById(socket.gameId);
	}
};

GameController.prototype.muligane() = function(socket) {
	if(!this.isPlayer()) return;
	this.service.muligane(socket.game,socket.player);
};

GameController.prototype.poseCard() = function(socket, cardId) {
	if(!this.isPlayer()) return;
	this.service.poseCard(socket.game,socket.player, socket.player.getCardById(cardId));
};

GameController.prototype.valid() = function(socket) {
	if(!this.isPlayer()) return;
	this.service.valid(socket.game,socket.player);
};

GameController.prototype.getGameById = function(id) {
	return this.gameList[id];
};

GameController.prototype.isPlayer() = function(socket) {
	return socket.game != null;
};