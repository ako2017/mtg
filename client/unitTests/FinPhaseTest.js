QUnit.module( "FinPhase" , {
	before: function() {
	  // prepare something once for all tests
	},
	beforeEach: function() {
		this.game = new Game();
		var player = createPlayer('p1');
		this.game.addPlayer(player);
		var player2 = createPlayer('p2');
		this.game.addPlayer(player2);
		this.finPhase = new FinPhase(this.game.pm); 
	},
	afterEach: function() {
	  // clean up after each test
	},
	after: function() {
	  // clean up once after all tests are done
	}
});

QUnit.test('valid_should_returnNETTOYAGE_when_allPlayerValid', function(assert) {
	//GIVEN 
	//WHEN
	var result = this.finPhase.valid(this.game.getPlayers()[0]);
	result = this.finPhase.valid(this.game.getPlayers()[1]);
	//THEN
	assert.ok(result == PHASE.NETTOYAGE);
});

QUnit.test('isAuthorized_should_returnFalse_when_playerWithTokenPoseCardCreature', function(assert) {
	//GIVEN
	var card = createCardCreature(this.game.getPlayerWithToken());
	//WHEN
	var result = this.finPhase.isAuthorized('poseCard', {player:this.game.getPlayerWithToken(),card:card});
	//THEN
	assert.ok(result == false);
});

QUnit.test('isAuthorized_should_returnTrue_when_playerWithTokenPoseCardEphemere', function(assert) {
	//GIVEN
	var card = createCardEphemere(this.game.getPlayerWithToken())
	//WHEN
	var result = this.finPhase.isAuthorized('poseCard', {player:this.game.getPlayerWithToken(),card:card});
	//THEN
	assert.ok(result == true);
});