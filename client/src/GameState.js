gameState = function(game){
	this.gameModel = null;
}
 
gameState.prototype = {
  	create: function(){
  		this.gameModel = new Game();
  		this.gameModel.addPlayer(this.createPlayer('lala'));
  		this.gameModel.addPlayer(this.createPlayer('pau'));
		var view = new GameView(this.game, this.gameModel);
		this.game.add.existing(view);
		setTimeout(this.start.bind(this), Duration.DECLARATION_ATTAQUANT);
	},
	start: function(name) {
		this.gameModel.start();
	},
	createPlayer: function(name) {
		var player = new Player();
		player.name = name;
		var cards = [];
		cards.push(cardCreature);
		cards.push(cardEphemere);
		cards.push(cardEphemere2);
		cards.push(island);
		for(var i=0;i<60;i++) {
			this.createCard(player, cards[this.game.rnd.integerInRange(0, 3)]);
		}
		return player;
	},
	createCard: function(player, data) {
		var card = new Card(player);
		card.init(data);
		player.deck.push(card);
		return card;
	}
}

var cardCreature = {
		extension : 0,
		numero : 1,
		force : 0,
		endurance : 0,
		nom:"nom",
		text:"descriptif de la carte",
		mana: [1,0,0,0,0,0],
		typeLabel:"type de la carte",
		type:1,//TypeCard.CREATURE,
		vol : false,
		celerite : false,
		vigilance : false,
		capacities : [{
			mana : [0,0,0,0,0,0],
			action : "alert('test'+ this.card.force)",
			trigger : 14//GameEvent.ON_ENTER_BATTLEFIELD
		}]
};

var island = {
		extension : 0,
		numero : 21,
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
		capacities : [{
			mana : [1,0,0,0,0,0],
			action : "alert('test');ctx.game.players[0].name='lolo'",
			cible : null
		}]
};

var cardEphemere = {
		extension : 0,
		numero : 2,
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
			action : "alert('test');ctx.game.players[0].name='lolo'",
			cible : null
		}]
};

var cardEphemere2 = {
		extension : 0,
		numero : 3,
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