GameService = function () {
	this.game = null;
};

GameService.prototype.getAvailableCards = function(extensionId) {
	db = new localStorageDB("mtg_db", localStorage);
	var queryResult = db.query('card_table', {ext_ref: extensionId});
	return queryResult;
};

GameService.prototype.createGame = function() {
	this.game = new Game();
	this.game.handler = new HandlerMsg();
	this.game.addObserver(this.game.handler)
	return this.game;
};

GameService.prototype.addPlayer = function(game, player) {
	if(!this.beginHandler(game)) return;
	game.addPlayer(player);
	if(game.isFull()) {
		game.start();
	}
	this.endHandler(game);
};

GameService.prototype.muligane = function(game, player) {
	if(!this.beginHandler(game)) return;
	player.muligane();
	this.endHandler(game);
};

GameService.prototype.poseCard = function(game, player, card) {
	if(!this.beginHandler(game)) return;
	game.poseCard(card);
	this.endHandler(game);
};

GameService.prototype.valid = function(game, player) {
	if(!this.beginHandler(game)) return;
	game.pm.valid(player);
	this.endHandler(game);
};

GameService.prototype.beginHandler = function(game) {
	return game.handler.start();
};

GameService.prototype.endHandler = function(game) {
	game.handler.send();
	game.handler.stop();
};