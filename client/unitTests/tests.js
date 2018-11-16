QUnit.test('Test création jeu', function(assert) {
	service = new GameService();
	game = service.createGame();
	assert.ok(game != null, 'jeu créé');
});

QUnit.test('Test partie', function(assert) {
	var service = new GameService();
	var game = service.createGame();
	assert.ok(game != null, 'jeu créé');
	var player1 = createPlayer('joueur1');
	var player2 = createPlayer('joueur2');
	service.addPlayer(game, player1);
	assert.ok(game.handler.getLastSend()[0].type == GameEvent.ADD_PLAYER, 'joueur ajouté');
	
	service.addPlayer(game, player2);
	assert.ok(game.handler.getLastSend()[0].type == GameEvent.ADD_PLAYER, 'joueur ajouté');
	assert.ok(game.handler.getLastSend()[1].type == GameEvent.CHANGE_PHASE && game.handler.getLastSend()[1].data == PHASE.DISTRIBUTION, 'on passe en phase distribution');
	assert.ok(game.handler.getLastSend()[2].type == GameEvent.DISTRIBUTION, 'on distribue');
	
	service.muligane(game,player1);
	assert.ok(game.handler.getLastSend()[0].type == GameEvent.MULIGANE, 'un muligane demandé par le joueur 1');
	assert.ok(game.handler.getLastSend()[0].data.hand.length == 6, 'le joueur a maintenant 6 cartes');

	service.valid(game, player1);
	service.valid(game, player2);
	assert.ok(game.handler.getLastSend()[0].type == GameEvent.CHANGE_PHASE, 'on passe en phase qui commence ?');
	assert.ok(game.handler.getLastSend()[1].type == GameEvent.WHO_BEGIN, 'qui commence');
	assert.ok(game.handler.getLastSend()[2].type == GameEvent.CHANGE_PHASE, 'on passe à la phase dégagement');
	assert.ok(game.handler.getLastSend()[3].type == GameEvent.CHANGE_PHASE, 'on passe à la phase entretient');
	assert.ok(game.handler.getLastSend()[4].type == GameEvent.CHANGE_PHASE, 'on passe à la phase pioche');
	assert.ok(game.handler.getLastSend()[5].type == GameEvent.CHANGE_PHASE, 'on passe à la phase principale');
	assert.ok(game.handler.getLastSend().length == 6, 'on est en attente d\'action du joueur principal');

	service.valid(game, game.getPlayerWithToken());
	service.valid(game, game.getPlayerWithToken());
	assert.ok(game.handler.getLastSend()[0].type == GameEvent.NEXT_TOKEN, 'on passe le token à l\'autre joueur');
	assert.ok(game.handler.getLastSend()[1].type == GameEvent.CHANGE_PHASE, 'on passe à la phase déclaration des attaquants');
	assert.ok(game.handler.getLastSend()[2].type == GameEvent.CHANGE_PHASE && game.handler.getLastSend()[2].data == PHASE.DECLARATION_BLOQUEUR, 'on passe à la phase de déclaration des bloqueurs');
	assert.ok(game.handler.getLastSend()[3].type == GameEvent.CHANGE_PHASE && game.handler.getLastSend()[3].data == PHASE.ATTRIBUTION_BLESSURE, 'on passe à la phase de attribution des blessures');
	assert.ok(game.handler.getLastSend()[4].type == GameEvent.RESTAURE_BLOQUEURS, 'on passe à la restauration des bloqueurs');
	assert.ok(game.handler.getLastSend()[5].type == GameEvent.CHANGE_PHASE && game.handler.getLastSend()[5].data == PHASE.PRINCIPALE, 'on passe à la 2nd phase principale');
	
	service.valid(game, game.getPlayerWithToken());
	assert.ok(game.handler.getLastSend()[0].type == GameEvent.NEXT_TOKEN, 'on passe le token à l\'autre joueur');
	assert.ok(game.handler.getLastSend()[1].type == GameEvent.CHANGE_PHASE && game.handler.getLastSend()[1].data == PHASE.FIN, 'on passe à la phase de fin');
	assert.ok(game.handler.getLastSend()[2].type == GameEvent.CHANGE_PHASE && game.handler.getLastSend()[2].data == PHASE.NETTOYAGE, 'on passe à la phase de nettoyage');
	
});

/*
QUnit.test('Test Pile', function(assert) {
	var game = new Game();
	var stack = new Stack();
	var lala = createPlayer('lala');
	var pau = createPlayer('pau');
	game.addPlayer(lala);
	game.addPlayer(pau);
	var cardPau = createCard(pau, cardEphemere);
	stack.push(cardPau);
	stack.resolve(game);
	assert.ok(game.players[0].name=='lolo', 'lala est lolo');
});
*/
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
			action : "alert('test2');ctx.game.players[0].name='lolo'",
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