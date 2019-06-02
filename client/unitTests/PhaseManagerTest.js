QUnit.module( "PhaseManager", {
	before: function() {
	  // prepare something once for all tests
	},
	beforeEach: function() {
		this.game = new Game();
		var player = createPlayer('p1');
		this.game.addPlayer(player);
		var player2 = createPlayer('p2');
		this.game.addPlayer(player2);
		this.pm = this.game.pm;
	},
	afterEach: function() {
	  // clean up after each test
	},
	after: function() {
	  // clean up once after all tests are done
	}
});

QUnit.test('next_shouldNotChangePhase_ifPhaseWait', function(assert) {
	//GIVEN
  var phases = [];
	phases[0] = new StubPhase(this.pm,0,PHASE.WAIT,PHASE.WAIT);
	phases[1] = new StubPhase(this.pm,1,PHASE.WAIT,PHASE.WAIT);
	this.pm.initPhases(phases);
	this.pm.currentPhase = phases[0];
	//WHEN
	this.pm.valid(null);
	this.pm.next();
	//THEN
	assert.ok(this.pm.isCurrentPhase(0));
});

QUnit.test('next_shouldChangePhase_ifPhaseNotWait', function(assert) {
	//GIVEN
  var phases = [];
	phases[0] = new StubPhase(this.pm,0,PHASE.WAIT,1);
	phases[1] = new StubPhase(this.pm,1,PHASE.WAIT,PHASE.WAIT);
	this.pm.initPhases(phases);
	this.pm.currentPhase = phases[0];
	//WHEN
	this.pm.valid(null);
	this.pm.next();
	//THEN
	assert.ok(this.pm.isCurrentPhase(1));
});