QUnit.module( "Game", {
	before: function() {
	  // prepare something once for all tests
	},
	beforeEach: function() {
		this.game = new Game();
		var player = createPlayer('p1');
		this.game.addPlayer(player);
		var player2 = createPlayer('p2');
		this.game.addPlayer(player2);
	},
	afterEach: function() {
	  // clean up after each test
	},
	after: function() {
	  // clean up once after all tests are done
	}
});

QUnit.test('execute_should_give7CardsToPlayer', function(assert) {
	//GIVEN
	//WHEN
	this.distributionPhase.execute();
	//THEN
	assert.ok(this.game.getPlayers()[0].hand.length == 7, 'on a 7 cartes');
});