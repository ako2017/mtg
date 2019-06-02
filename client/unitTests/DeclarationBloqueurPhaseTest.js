QUnit.module( "DeclarationBloqueurPhase", {
	before: function() {
	  // prepare something once for all tests
	},
	beforeEach: function() {
		this.game = new Game();
		var player = createPlayer('p1');
		this.game.addPlayer(player);
		var player2 = createPlayer('p2');
		this.game.addPlayer(player2);
		this.declarationBloqueurPhase = new DeclarationBloqueurPhase(this.game.pm); 
	},
	afterEach: function() {
	  // clean up after each test
	},
	after: function() {
	  // clean up once after all tests are done
	}
});

QUnit.test('valid_should_returnATTRIBUTION_BLESSURE__when_allPlayersValid', function(assert) {
	//GIVEN
	this.declarationBloqueurPhase.hasDonedeclaration = true;
	//WHEN
	var result1 = this.declarationBloqueurPhase.valid(this.game.getPlayers()[0]);
	var result2 = this.declarationBloqueurPhase.valid(this.game.getPlayers()[1]);
	//THEN
	assert.ok(result1 == PHASE.WAIT && result2 == PHASE.ATTRIBUTION_BLESSURE);
});

QUnit.test('valid_should_returnWAIT__when_playerActifValidFirstTime', function(assert) {
	//GIVEN
	//WHEN
	var result = this.declarationBloqueurPhase.valid(this.game.getPlayerActif());
	//THEN
	assert.ok(result == PHASE.WAIT);
});