var GUI = new Gui();
gameState = function(game) {
	this.gameController = null;
}

gameState.prototype = {
	create : function() {
		var model = this.createModel();
		var view = this.createGameView();
		var guiView = this.createGuiView();
		this.gameController = new GameController();
		this.gameController.gameModel = model;
		view.controller = this.gameController;
		view.gameModel = model;
		guiView.controller = this.gameController;
		guiView.gameModel = model;
		guiView.gameView = view;
		view.init();
		guiView.init();
		GUI.gameController=this.gameController;
		setTimeout(this.start.bind(this), Duration.DECLARATION_ATTAQUANT);
	},
	start : function() {
		this.gameController.init();
	},
	createModel : function() {
		var gameModel = new Game();
		gameModel.addPlayer(this.createPlayer('lala'));
		gameModel.addPlayer(this.createPlayer('pau'));
		return gameModel;
	},
	createGameView : function() {
		var view = new GameView(this.game);
		this.game.add.existing(view);
		return view;
	},
	createGuiView : function() {
		var view = new GuiView();
		return view;
	},
	createPlayer :function(name) {
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
		type:1,// TypeCard.CREATURE,
		vol : false,
		celerite : false,
		vigilance : false,
		capacities : [{
			mana : [0,0,0,0,0,0],
			action : "alert('je suis dans le champs de bataille')",
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
		mana: [1,0,0,0,0,0],
		typeLabel:"type de la carte",
		type:5,// TypeCard.EPHEMERE,
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
		mana: [1,0,0,0,0,0],
		typeLabel:"type de la carte",
		type:5,// TypeCard.EPHEMERE,
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