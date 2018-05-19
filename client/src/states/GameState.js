gameState = {
	create : function() {
		this.model = this.createModel();
		this.createGameView();
		this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {this.model.start();}, this);
	},
	createModel : function() {
		var gameModel = new Game();
		gameModel.addPlayer(this.createPlayer('lala'));
		gameModel.addPlayer(this.createPlayer('pau'));
		return gameModel;
	},
	createGameView : function() {
		var view = new GameView(this.game);
		view.gameModel = this.model;
		view.gameCtrl = new GameController(this.model);
		view.gameCtrl.view = view;
		view.init();
		this.game.add.existing(view);
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


CONFIG = {
		pilelabel : [0,180],
		pile : [37,248],
		deck : [[37,548],[37,52]],
		cemeterylabel : [[705,480],[705,0]],
		cemetery : [[725,496],[725,0]],
		phase : [680,280],
		error : [0,120]
}

/*
CONFIG = {
		pilelabel : [0,180],
		pile : [0,196],
		deck : [[0,496],[0,0]],
		cemeterylabel : [[705,480],[705,0]],
		cemetery : [[725,496],[725,0]],
		phase : [680,280],
		error : [0,120]
}
*/
phaseMapping = [];

phaseMapping[PHASE.DISTRIBUTION] ="DISTRIBUTION";
phaseMapping[PHASE.WHO_BEGINS] = "WHO_BEGINS";
phaseMapping[PHASE.DEGAGEMENT] = "DEGAGEMENT";
phaseMapping[PHASE.ENTRETIENT] = "ENTRETIENT";
phaseMapping[PHASE.PIOCHE] = "PIOCHE";
phaseMapping[PHASE.PRINCIPALE] = "PRINCIPALE";
phaseMapping[PHASE.DECLARATION_ATTAQUANT] = "DECLARATION\nATTAQUANT";
phaseMapping[PHASE.DECLARATION_BLOQUEUR] = "DECLARATION\nBLOQUEUR";
phaseMapping[PHASE.ATTRIBUTION_BLESSURE] = "ATTRIBUTION\nBLESSURE";
phaseMapping[PHASE.FIN] = "FIN";
phaseMapping[PHASE.NETTOYAGE] = "NETTOYAGE";

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
			action : "this._cible.addMarqueur(1,0,Ttl.EOT)",
			cible : "card.type == TypeCard.CREATURE",
			trigger : 15
		}]
};