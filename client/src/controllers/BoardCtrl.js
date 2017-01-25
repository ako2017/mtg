BoardCtrl = function (board) {
	this.board = board;
	this.player = board.players[1];
};

BoardCtrl.prototype.endOfTurn = function(boardView) {
	boardView.muliganeBtn.visible = false;
	if(this.board.phase == Phase.DISTRIBUTION) {
		var cards = boardView.players[1].hand;
		this.board.endOfTurn(this.player);
	}
	else if(this.board.phase == Phase.PRINCIPALE) {
		var cards = boardView.players[1].hand;
		
		var cardToChange = [];
		for(var i=0;i<cards.length;i++){
			var card = cards[i]; 
			if(card.isSelected) {
				this.board.poseCard(this.player,card.model);
				return;
			}
		}
		this.board.passer(this.player);
	}
	else if(this.board.phase == Phase.COMBAT) {
		this.board.passer(this.player);
	}
	else if(this.board.phase == Phase.PRINCIPALE_2) {
		this.board.passer(this.player);
	}
	else if(this.board.phase == Phase.FIN) {
		this.board.passer(this.player);
	}
	else if(this.board.sousEtape == SousEtape.RETIRER_CARD) {
		var cards = boardView.players[1].hand;
		var cardToRetire = [];
		for(var i=0;i<cards.length;i++){
			var card = cards[i]; 
			if(card.isSelected) {
				cardToRetire.push(card.model);
			}
		}
		this.board.retirerCard(this.player, cardToRetire);
	}
};

BoardCtrl.prototype.muligane = function(boardView) {
	this.board.muligane(this.player);
};

BoardCtrl.prototype.poseCard = function(cardView) {
	this.board.poseCard(this.player, cardView.model);
};