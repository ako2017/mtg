class PlayerView {

	constructor() {
		this.deck = [];
		this.hand = [];
		this.terrains = [];
		this.battlefield = [];
		this.mana = [];
		this.manaLabel = [];
	}

	getCardById(cards,cardId) {
		for(var i=0;i<cards.length;i++) {
			if(cards[i].uid == cardId) {
				return cards[i];
			}
				
		}
		return null;
	}

	getDeckById(cardId) {
		return this.getCardById(this.deck, cardId);
	}

	getHandById(cardId) {
		return this.getCardById(this.hand, cardId);
	}

	getBattlefieldById(cardId) {
		return this.getCardById(this.battlefield, cardId);
	}

}