GameService = function () {

};

GameService.prototype.createGame = function() {
	var game = new Game();
	game.handler = new HandlerMsg();
	game.addObserver(game.handler)
	return game;
};

GameService.prototype.addPlayer = function(game, player) {
	if(game.isFull()) return null;
	game.addPlayer(player);
	if(game.isFull()) {
		game.start();
	}
	return player;
};

GameService.prototype.muligane = function(game, player) {
	if(AccessHelper.canMuligane(player)) {
		player.muligane();
	}
};

GameService.prototype.retirerCard = function(game, player, card) {
	if(AccessHelper.canRetirerCard(game, player, card)) {
		player.retirerCard(card);
	}
};

GameService.prototype.valid = function(game, player) {
	if(AccessHelper.canValid(player,game)) {
		game.pm.valid(player);
	}
};


GameService.prototype.poseCard = function(game, player, card) {
	if(AccessHelper.canPoseCard(player,game,card, stack)) {
		player.payMana(card.mana);
		player.poseCard(card, game.stack);
	}
};