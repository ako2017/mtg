GameController = function () {
	this.gameModel = null;
};

GameController.prototype.constructor = GameController;

GameController.prototype.init = function() {
	this.gameModel.start();
};

GameController.prototype.valid = function(player) {
	this.gameModel.valid(player);
};

GameController.prototype.muligane = function(player) {
	player.muligane();
};

GameController.prototype.poseCard = function(player, card) {
	this.gameModel.poseCard(player, card);
};
