GameCtrl = function(board) {
	this.board = board;
};

GameCtrl.prototype.pass = function(playerView) {
	playerView.model.pass();
}

GameCtrl.prototype.poseCard = function(playerView,cardView) {
	playerView.model.poseCard(cardView.model);
}

GameCtrl.prototype.validCible = function(playerView,cardsView) {
	this.board.stack.validCible(playerView.model,cards);
}

//GameCtrl.prototype.endOfTurn = function(boardView) {
//	boardView.muliganeBtn.visible = false;
//	if(this.board.mode ==  Mode.SELECT_CARD) {
//		this.board.validSelection(this.getSelectedCards());
//		return;
//	}
//	if (this.board.phase == Phase.DISTRIBUTION) {
//		var cards = boardView.players[1].hand;
//		this.board.endOfTurn(this.player);
//	} else if (this.board.phase == Phase.PRINCIPALE) {
//		var cards = boardView.players[1].hand;
//		for (var i = 0; i < cards.length; i++) {
//			var card = cards[i];
//			if (card.isSelected) {
//				this.board.poseCard(this.player, card.model);
//				return;
//			}
//		}
//		this.board.pass(this.player);
//	} else if (this.board.phase == Phase.COMBAT) {
//		this.board.pass(this.player);
//	} else if (this.board.phase == Phase.PRINCIPALE_2) {
//		this.board.pass(this.player);
//	} else if (this.board.phase == Phase.FIN) {
//		this.board.pass(this.player);
//	}
//};
GameCtrl.prototype.muligane = function(playerView) {
	playerView.model.muligane();
}