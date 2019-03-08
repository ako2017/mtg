class PlayerView {

	constructor() {
		this.deck = [];
		this.hand = [];
		this.terrains = [];
		this.battlefield = [];
		this.mana = [];
		this.manaLabel = [];
	}

	getCardById(cardId) {
		for(var i=0;i<this.deck.length;i++) {
			if(this.deck[i].uid == cardId) {
				return this.deck[i];
			}
				
		}
		return null;
	}

}