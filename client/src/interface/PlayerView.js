class PlayerView {

	constructor() {
		this.deck = [];
		this.hand = [];
		this.terrains = [];
		this.battlefield = [];
		this.cemetery = [];
		this.mana = [];
		this.manaLabel = [];
	}

	getCardById(cards,cardId,toRemove) {
		for(var i=0;i<cards.length;i++) {
			if(cards[i].uid == cardId) {
				if(toRemove) {
					return cards.removeByValue(cards[i]);
				}
				return cards[i];
			}
				
		}
		return null;
	}

	getCardByIdAll(cardId, toRemove) {
		var list = [
			this.hand,this.battlefield,this.terrains,this.deck
		];
		for(var i=0; i< list.length;i++) {
			var card = this.getCardById(list[i],cardId,toRemove); 
			if(card != null) {
				return card;
			}
		}
		return null;
	}

	getDeckById(cardId, toRemove) {
		return this.getCardById(this.deck, cardId, toRemove);
	}

	getHandById(cardId, toRemove) {
		return this.getCardById(this.hand, cardId, toRemove);
	}

	getBattlefieldById(cardId, toRemove) {
		return this.getCardById(this.battlefield, cardId, toRemove);
	}

	getTerrainById(cardId, toRemove) {
		return this.getCardById(this.terrains, cardId, toRemove);
	}

}