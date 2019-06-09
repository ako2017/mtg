function createPlayer(name) {
	var player = new Player();
	player.name = name;
	for(var i=0;i<60;i++) {
		createCard(player, cardCreature);
	}
	return player;
};

function createCard(player, data) {
	var card = new Card(player);
	card.init(data);
	player.deck.push(card);
	return card;
};

function giveCardFromDecktoHand(player, number) {
	for(var i=0;i<number;i++) {
		player.hand.push(player.deck.pop());
	}
}

function createCardCreature(player) {
	var card = new Card(player);
	card.init(cardCreature);
	return card;
};

function createCardTerrain(player) {
	var card = new Card(player);
	card.init(cardTerrain);
	return card;
};

function createCardEphemere(player) {
	var card = new Card(player);
	card.init(cardEphemere);
	return card;
};

function giveInHand(player, nbCard) {
	for(var i=0;i<nbCard;i++) {
		player.hand.push(player.deck.pop());
	}
};

function createCreatureAddOneLife(player) {
	var card = new Card(player);
	card.force = 0;
	card.endurance = 0;
	card.mana = [1,0,0,0,0,0];
	card.type = TypeCard.CREATURE;
	var capacity = new Capacity([1,0,0,0,0,0], null);
	capacity.addEffect(new AddLifeEffect(5));
	card.addCapacity(capacity);
	return card;
};

function createCreatureTriggerOnEnterBattlefieldAddOneLife(player) {
	var card = new Card(player);
	card.force = 0;
	card.endurance = 0;
	card.mana = [1,0,0,0,0,0];
	card.type = TypeCard.CREATURE;
	var capacity = new Capacity([0,0,0,0,0,0], function(trigger,source) {return trigger == GameEvent.ON_ENTER_BATTLEFIELD});
	capacity.addEffect(new AddLifeEffect(10));
	card.addCapacity(capacity);
	return card;
};



var cardCreature = {
		force : 0,
		endurance : 0,
		nom:"nom",
		text:"descriptif de la carte",
		mana: [0,0,0,0,0,0],
		typeLabel:"type de la carte",
		type:1,//TypeCard.CREATURE,
		vol : false,
		celerite : false,
		vigilance : false,
		capacities : [{
			mana : [0,0,0,0,0,0],
			action : "alert('test1'+ this.card.force)",
			trigger : 14//GameEvent.ON_ENTER_BATTLEFIELD
		}]
};

var cardTerrain = {
		force : 0,
		endurance : 0,
		nom:"nom",
		text:"descriptif de la carte",
		mana: [0,0,0,0,0,0],
		typeLabel:"type de la carte",
		type:3,//TypeCard.TERRAIN,
		vol : false,
		celerite : false,
		vigilance : false,
		capacities : []
};

var cardEphemere = {
		force : 0,
		endurance : 0,
		nom:"nom",
		text:"descriptif de la carte",
		mana: [0,0,0,0,0,0],
		typeLabel:"type de la carte",
		type:5,//TypeCard.EPHEMERE,
		vol : false,
		celerite : false,
		vigilance : false,
		capacities : [{
			mana : [1,0,0,0,0,0],
			action : "ctx.game.players[0].name='lolo'",
			cible : null
		}]
};

var cardEphemere2 = {
		force : 0,
		endurance : 0,
		nom:"nom",
		text:"descriptif de la carte",
		mana: [1],
		typeLabel:"type de la carte",
		type:5,//TypeCard.EPHEMERE,
		vol : false,
		celerite : false,
		vigilance : false,
		capacities : [{
			mana : [0,0,0,0,0,0],
			action : "this._cible.addMarqueur(1,0,Ttl.EOT)",
			cible : "card.type == TypeCard.CREATURE",
			trigger : 15
		}]
};