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

	getCardByIdAll(cardId) {
		var list = [
			this.hand,this.battlefield,this.terrains,this.deck
		];
		for(var i=0; i< list.length;i++) {
			var card = this.getCardById(list[i],cardId); 
			if(card != null) {
				return card;
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