GameCtrl = function(board) {
	this.board = board;
	this.player = board.players[1];
};

GameCtrl.prototype.endOfTurn = function(boardView) {
	boardView.muliganeBtn.visible = false;
	if(this.board.mode ==  Mode.SELECT_CARD) {
		this.board.validSelection(this.getSelectedCards());
		return;
	}
	if (this.board.phase == Phase.DISTRIBUTION) {
		var cards = boardView.players[1].hand;
		this.board.endOfTurn(this.player);
	} else if (this.board.phase == Phase.PRINCIPALE) {
		var cards = boardView.players[1].hand;
		for (var i = 0; i < cards.length; i++) {
			var card = cards[i];
			if (card.isSelected) {
				this.board.poseCard(this.player, card.model);
				return;
			}
		}
		this.board.pass(this.player);
	} else if (this.board.phase == Phase.COMBAT) {
		this.board.pass(this.player);
	} else if (this.board.phase == Phase.PRINCIPALE_2) {
		this.board.pass(this.player);
	} else if (this.board.phase == Phase.FIN) {
		this.board.pass(this.player);
	}
};

GameCtrl.prototype.muligane = function(boardView) {
	this.board.muligane(this.player);
};

GameCtrl.prototype.poseCard = function(cardView) {
	this.board.poseCard(this.player, cardView.model);
};

GameCtrl.prototype.getSelectedCards = function() {
	var cards = boardView.players[1].hand;
	var res = [];
	for (var i = 0; i < cards.length; i++) {
		var card = cards[i];
		if (card.isSelected) {
			res.push(card.model);
		}
	}
	return res;
};