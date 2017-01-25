DistributionCardState = function () {
};

DistributionCardState.prototype.valid = function(board) {

};

DistributionCardState.prototype.distributionCard = function(board, player, nbCards) {
	for(var j=0;j<nbCards;j++) {
		var card =	player.deck.pop();
		card.inputEnabled = true;
		card.input.enableDrag();
		//card.events.onDragStart.add(board.onDragCard, board);
		tween = board.game.add.tween(card).to({ x: 0+j*130, y: 220 }, 500, Phaser.Easing.Linear.None, true);
		card.show();
		player.hand.push(card);
	}
};

DistributionCardState.prototype.distributionCardInHand = function(board, player) {
	var cards = player.hand;
	for(var j=0;j<cards.length;j++) {
		var card =	cards[j];
		tween = board.game.add.tween(card).to({ x: 0+j*80, y: 10 }, 500, Phaser.Easing.Linear.None, true);
		card.show();
	}
};