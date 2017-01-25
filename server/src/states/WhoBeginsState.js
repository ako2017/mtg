WhoBeginsState = function () {
};

WhoBeginsState.prototype.execute = function(result,board) {
	var res = Math.floor((Math.random() * 10))%2;
	if(res == 1) {
		var tmp = board.players[0];
		board.players[0] = board.players[1];
		board.players[1] = tmp;
	}
	result.put("WHO_BEGINS",{id:board.players[0].id});
	board.changeState(result,States.DEGAGEMENT);
};

module.exports = WhoBeginsState;