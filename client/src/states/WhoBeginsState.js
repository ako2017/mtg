WhoBeginsState = function () {
};

WhoBeginsState.prototype.execute = function(board) {
	var res = Math.floor((Math.random() * 10))%2;
	if(res == 1) {
		var tmp = board.players[0];
		board.players[0] = board.players[1];
		board.players[1] = tmp;
	}
	board.changeState(States.DISTRIBUTION);
};

