Degagement = function () {
};

Degagement.prototype.execute = function(result,board) {
	
};

Degagement.prototype.validDegagement = function(result,playerId,cardsToDegage) {
	var player = board.getPlayersById[playerId];
	
	board.changeState(result,States.WHO_BEGINS);
	
	result.put("CHANGE_CARD",newCard);

};