Policy = function(board) {
	this.board = board;
};



Policy.prototype.canPass = function(player) {
	return this.board.getPlayerWithToken().name != player.name);
};
