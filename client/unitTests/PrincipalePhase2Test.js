QUnit.module( "PrincipalePhase2", {
	before: function() {
	  // prepare something once for all tests
	},
	beforeEach: function() {
		this.game = new Game();
		var player = createPlayer('p1');
		this.game.addPlayer(player);
		var player2 = createPlayer('p2');
		this.game.addPlayer(player2);
		this.principalePhase = new PrincipalePhase(this.game.pm);
		this.principalePhase.phaseNum = 1;
	},
	afterEach: function() {
	  // clean up after each test
	},
	after: function() {
	  // clean up once after all tests are done
	}
});

QUnit.test('valid_should_returnWAIT_when_notAllPlayerValid', function(assert) {
	//GIVEN 
	//WHEN
	var result = this.principalePhase.valid(this.game.getPlayers()[0]);
	//THEN
	assert.ok(result == PHASE.WAIT, 'on retourne WAIT');
});

QUnit.test('valid_should_returnFIN_when_allPlayerValid', function(assert) {
	//GIVEN 
	//WHEN
	var result = this.principalePhase.valid(this.game.getPlayers()[0]);
	result = this.principalePhase.valid(this.game.getPlayers()[1]);
	//THEN
	assert.ok(result == PHASE.FIN, 'on retourne FIN');
});