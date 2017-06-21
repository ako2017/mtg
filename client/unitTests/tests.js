QUnit.test('Test ajout joueurs', function(assert) {
	var board = new Board();
	board.addPlayer("p1");
	assert.ok(!board.isFull(), 'plateau pas complet');
	board.addPlayer("p2");
	assert.ok(board.isFull(), 'plateau complet');
});

QUnit.test('Test muligane', function(assert) {
	var player =  createPlayer('lala','a');
	var board = new Board();
	board.addPlayer(player);
	board.addPlayer(createPlayer('pau','a'));
	board.distribution();
	for(var i=0;i<6;i++) {
		player.muligane();	
		assert.ok(player.hand.length == 6-i, 'muligane reste ' + (6-i) + ' cartes');
	}
	player.muligane();
	assert.ok(player.hand.length == 1, 'muligane reste 1 carte');
});

QUnit.test('Test phase de jeu', function(assert) {
	var board = new Board();
	board.addPlayer(createPlayer('lala','a'));
	board.addPlayer(createPlayer('pau','a'));
	assert.ok(board.isFull(), 'plateau complet');
	board.distribution();
	assert.equal(board.players[0].deck.length,60-7, '53 cartes dans le deck du joueur 1');
	assert.equal(board.players[1].deck.length,60-7, '53 cartes dans le deck du joueur 2');
	assert.equal(board.players[0].hand.length,7, '7 cartes dans la main du joueur 1');
	assert.equal(board.players[1].hand.length,7, '7 cartes dans la main du joueur 2');
	board.endOfTurn(board.players[0]);
	assert.ok(board.phase == Phase.DISTRIBUTION, 'on est toujours en distribution');
	board.endOfTurn(board.players[1]);
	assert.ok(board.phase == Phase.WHO_BEGINS, 'on cherche qui va commencer');
	assert.async();
	setTimeout(function () {
		assert.ok(board.phase == Phase.PRINCIPALE, 'on est en phase PRINCIPALE apres 2 secondes');
	  }, 2100);
	
});

function createPlayer(name, avatar) {
	var player = new Player();
	player.avatar = avatar;
	var cardService = new CardService();
	var cards = cardService.getAvailableCards();
	var nbCards = cards.length;
	player.name = name;
	for(var i=0;i<60;i++) {
		var card = new Card(player);
		card.init(JSON.parse(cards[Math.floor((Math.random() * 300))%nbCards].data));
		player.deck.push(card);
	}
	return player;
};

function wait(ms){
	   var start = new Date().getTime();
	   var end = start;
	   while(end < start + ms) {
	     end = new Date().getTime();
	  }
};