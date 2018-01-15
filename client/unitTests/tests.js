QUnit.test('Test ajout joueurs', function(assert) {
	var game = new Game();
	game.addPlayer(createPlayer('lala'));
	assert.ok(!game.isFull(), 'plateau pas complet');
	game.addPlayer(createPlayer('pau'));
	assert.ok(game.isFull(), 'plateau complet');
});

/*QUnit.test('Test muligane', function(assert) {
	var game = new game();
	var player =  createPlayer('lala','a');
	game.addPlayer(player);
	game.addPlayer(createPlayer('pau','a'));
	game.distribution();
	for(var i=0;i<6;i++) {
		player.muligane();	
		assert.ok(player.hand.length == 6-i, 'muligane reste ' + (6-i) + ' cartes');
	}
	player.muligane();
	assert.ok(player.hand.length == 1, 'muligane reste 1 carte');
});
*/
/*QUnit.test('Test Partie 1er tour', function(assert) {
	var time = 0;
	var game = new Game();
	var lala = createPlayer('lala');
	var pau = createPlayer('pau');
	game.addPlayer(lala);
	game.addPlayer(pau);
	assert.ok(game.isFull(), 'plateau complet');
	game.start();

	assert.equal(lala.deck.length,60-7, '53 cartes dans le deck du joueur 1');
	assert.equal(pau.deck.length,60-7, '53 cartes dans le deck du joueur 2');
	assert.equal(lala.hand.length,7, '7 cartes dans la main du joueur 1');
	assert.equal(pau.hand.length,7, '7 cartes dans la main du joueur 2');
	game.valid(lala);
	game.valid(pau);
	assert.ok(game.pm.isCurrentPhase(PHASE.WHO_BEGINS), 'WHO_BEGIN');
	assert.async();
	setTimeout(function () {
		assert.ok(game.pm.isCurrentPhase(PHASE.DEGAGEMENT), 'DEGAGEMENT');
	}, time+=2000);
	setTimeout(function () {
		assert.ok(game.pm.isCurrentPhase(PHASE.ENTRETIENT), 'ENTRETIENT');
	}, time+=2100);
	setTimeout(function () {
		assert.ok(game.pm.isCurrentPhase(PHASE.PIOCHE), 'PIOCHE');
	}, time+=2100);
	setTimeout(function () {
		assert.ok(game.pm.isCurrentPhase(PHASE.PRINCIPALE), 'PRINCIPALE');
		game.valid(game.getPlayerWithToken());
		game.valid(game.getPlayerWithToken());
		assert.ok(game.pm.isCurrentPhase(PHASE.DECLARATION_ATTAQUANT), 'DECLARATION_ATTAQUANT');
	}, time+=2100);
	setTimeout(function () {
		assert.ok(game.pm.isCurrentPhase(PHASE.DECLARATION_BLOQUEUR), 'DECLARATION_BLOQUEUR');
	}, time+=2100);
	setTimeout(function () {
		assert.ok(game.pm.isCurrentPhase(PHASE.ATTRIBUTION_BLESSURE), 'ATTRIBUTION_BLESSURE');
	}, time+=2100);
	setTimeout(function () {
		assert.ok(game.pm.isCurrentPhase(PHASE.PRINCIPALE), 'PRINCIPALE');
		game.valid(game.getPlayerWithToken());
		game.valid(game.getPlayerWithToken());
		assert.ok(game.pm.isCurrentPhase(PHASE.FIN), 'FIN');
	}, time+=2100);
	setTimeout(function () {
		assert.ok(game.pm.isCurrentPhase(PHASE.NETTOYAGE), 'NETTOYAGE');
	}, time+=2100);
	setTimeout(function () {
		assert.ok(game.pm.isCurrentPhase(PHASE.DEGAGEMENT), 'DEGAGEMENT');
	}, time+=2100);
});
*/

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
			action : "alert('test'+ this.card.force)",
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
			action : "alert('test');ctx.game.players[0].name='lolo'",
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