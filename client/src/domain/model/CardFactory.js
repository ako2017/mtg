class CardFactory {
	constructor(game) {
		this.game = game;
	}
	
	createCreature() {
		var card = new Card();
		var cardCreature = {
			force : 0,
			endurance : 0,
			nom:"nom",
			text:"descriptif de la carte",
			mana: [1,0,0,0,0,0],
			typeLabel:"type de la carte",
			type:1,//TypeCard.CREATURE,
			vol : false,
			celerite : false,
			vigilance : false
		}
		var capacity = new Capacity([0,0,0,0,0,0],14);//GameEvent.ON_ENTER_BATTLEFIELD
		capacity.push(new AddCapacityEffect(Capacity.VIGILANCE,TimeToLive.EOT,function(target){return target.type==TypeCard.CREATURE}));
		card.addCapacity(capacity);
		return card;
	}

}