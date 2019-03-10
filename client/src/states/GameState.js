class GameState {
	constructor() {
		this.view = null;
	}

	create() {
		this.createGameView();
	//	this.game.add.sprite(0, 0, 'logo');
		//this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {this.model.start();}, this);
	}

	createModel() {
		var gameModel = new Game();
		gameModel.addPlayer(this.createPlayer('lala'));
		gameModel.addPlayer(this.createPlayer('pau'));
		return gameModel;
	}

	createGameView() {
		this.view = new GameView(this.game);
		this.game.add.existing(this.view);
	}

}



/*

	createGameView() {
		this.view = new GameView(this.game);
		view.gameCtrl = new GameController(this.model);
		view.gameCtrl.view = view;
		this.game.add.existing(view);
	}

	createPlayer(name) {
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
	}

	createCard(player, data) {
		var card = new Card(player);
		card.init(data);
		player.deck.push(card);
		return card;
	}
*/

var cardCreature = {
		extension : 0,
		numero : 1,
		force : 5,
		endurance : 1,
		nom:"nom",
		text:"descriptif de la carte",
		mana: [1,0,0,0,0,0],
		typeLabel:"type de la carte",
		type:1,// TypeCard.CREATURE,
		vol : false,
		celerite : false,
		vigilance : false,
		capacities : [{
			mana : [0,0,0,0,0,0],
			action : "console.log('je suis dans le champs de bataille');this.card.owner.game.getPlayerNonActif().damage(0);",
			trigger : "trigger == GameEvent.ON_ENTER_BATTLEFIELD && source == this.card;"
		}]
};

var island = {
		extension : 0,
		numero : 21,
		force : 0,
		endurance : 0,
		nom:"nom",
		text:"descriptif de la carte",
		mana: [1,0,0,0,0,0],
		typeLabel:"type de la carte",
		type:3,// TypeCard.TERRAIN,
		vol : false,
		celerite : false,
		vigilance : false,
		capacities : [{
			mana : [1,0,0,0,0,0],
			action : "alert('test21');",//action : "alert('test21');ctx.game.players[0].name='lala'"
			cible : null
		}]
};

var cardEphemere = {
		extension : 0,
		numero : 2,
		force : 5,
		endurance : 1,
		nom:"nom",
		text:"descriptif de la carte",
		mana: [1,0,0,0,0,0],
		typeLabel:"type de la carte",
		type:5,// TypeCard.EPHEMERE,
		vol : false,
		celerite : false,
		vigilance : false,
		capacities : [{
			mana : [1,0,0,0,0,0],
			action : "alert('test2');",
			cible : null
		}]
};

var cardEphemere2 = {
		extension : 0,
		numero : 3,
		force : 5,
		endurance : 1,
		nom:"nom",
		text:"descriptif de la carte",
		mana: [1,0,0,0,0,0],
		typeLabel:"type de la carte",
		type:5,// TypeCard.EPHEMERE,
		vol : false,
		celerite : false,
		vigilance : false,
		capacities : [{
			mana : [0,0,0,0,0,0],
			action : "console.log('test carte2')",
			cible : "card.type == TypeCard.CREATURE",
			trigger : 15
		}]
};