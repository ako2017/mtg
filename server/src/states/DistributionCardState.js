DistributionCardState = function () {
};

DistributionCardState.prototype.execute = function(board) {
	var players = board.players;
	for(var i = 0; i<players.length;i++) {
		this.distributionCard(board,players[i],6);	
	}
};

DistributionCardState.prototype.changeCards = function(player,cardToChange) {
	var cardToChange = data.cardToChangeList;
	
	if(player.doneDistrib) {
		return;
	}
	
	if(cardToChange.length == 0) {
		player.doneDistrib = true;
		if(this.allDistribDone()) {
			board.changeState(States.WHO_BEGINS);
		}
	} 
	else {
		var cards = player.hand;
		var newCard = [];
		for(var i=1;i<cardToChange.length;i++) {
			var card = player.deck.pop();
			cards.push(card);
			newCard.push(card.id);
		}
		for(var i=0;i<cardToChange.length;i++) {
			for(var j=0;j<cards.length;i++) {
				if(cards[j].id == cardToChange[i]) {
					cards = cards.splice(j,1);
					continue;
				}
			}
		}
		player.hand = cards;
		//result.put("CHANGE_CARD",newCard);
	}
};

DistributionCardState.prototype.allDistribDone = function(board) {
	var players = board.players;
	for(var i = 0; i<players.length;i++) {
		if(board,players[i].doneDistrib == false) 
			return false;
	}
	return true;
}

/**
Nombre de cartes à distribuer
**/
DistributionCardState.prototype.distributionCard = function(board, player, nbCards) {
	for(var j=0;j<nbCards;j++) {
		var card =	player.deck.pop();
		player.hand.push(card);
	}
};

module.exports = DistributionCardState;