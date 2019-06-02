QUnit.module( "DistributionPhase", {
	before: function() {
	  // prepare something once for all tests
	},
	beforeEach: function() {
		this.game = new Game();
		var player = createPlayer('p1');
		this.game.addPlayer(player);
		var player2 = createPlayer('p2');
		this.game.addPlayer(player2);
		this.distributionPhase = new DistributionPhase(this.game.pm); 
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

QUnit.test('valid_should_returnWHO_BEGINS_when_allPlayersValid', function(assert) {
	//GIVEN
	//WHEN
	var result1 = this.distributionPhase.valid(this.game.getPlayers()[0]);
	var result2 = this.distributionPhase.valid(this.game.getPlayers()[1]);
	//THEN
	assert.ok(result1 == PHASE.WAIT && result2 == PHASE.WHO_BEGINS, 'on retourne WHO_BEGINS');
});

QUnit.test('valid_should_returnWAIT_ifNotAllPlayersValid', function(assert) {
	//GIVEN
	//WHEN
	var result = this.distributionPhase.valid(this.game.getPlayers()[0]);
	//THEN
	assert.ok(result == PHASE.WAIT, 'on retourne WAIT');
});

QUnit.test('isAuthorized_shouldReturnFalse_ifAnyPlayerPoseCard', function(assert) {
	//GIVEN
	//WHEN
	var result = this.distributionPhase.isAuthorized('poseCard', this.game.getPlayers()[0]);
	//THEN
	assert.ok(result == false, 'on retourne false');
});