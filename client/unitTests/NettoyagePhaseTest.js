QUnit.module( "NettoyagePhase" , {
	before: function() {
	  // prepare something once for all tests
	},
	beforeEach: function() {
		this.game = new Game();
		var player = createPlayer('p1');
		this.game.addPlayer(player);
		var player2 = createPlayer('p2');
		this.game.addPlayer(player2);
		this.nettoyagePhase = new NettoyagePhase(this.game.pm); 
	},
	afterEach: function() {
	  // clean up after each test
	},
	after: function() {
	  // clean up once after all tests are done
	}
});

QUnit.test('execute_should_returnWAIT_ifPlayerActifHasMoreThan7Cards', function(assert) {
	//GIVEN 
	var player = this.game.getPlayerActif();
	for(var i=0;i<8;i++) {
		player.hand.push(player.deck.pop());
	}
	//WHEN
	var result = this.nettoyagePhase.execute();
	//THEN
	assert.ok(result == PHASE.WAIT);
});

QUnit.test('execute_should_returnDEGAGEMENT_ifPlayerActifHasLessThan8Cards', function(assert) {
	//GIVEN 
	var player = this.game.getPlayerActif();
	giveCardFromDecktoHand(player,7);
	//WHEN
	var result = this.nettoyagePhase.execute();
	//THEN
	assert.ok(result == PHASE.DEGAGEMENT);
});

QUnit.test('execute_end_should_setPhasePrincipalePhaseNumTo0', function(assert) {
	//GIVEN 
	this.game.pm.phases[PHASE.PRINCIPALE].phaseNum = 1;
	//WHEN
	var result = this.game.pm.phases[PHASE.NETTOYAGE].end();
	//THEN
	assert.ok(this.game.pm.phases[PHASE.PRINCIPALE].phaseNum == 0);
});


QUnit.test('valid_should_returnDEGAGEMENT_when_playerActifValidAndHasLessThan8Cards', function(assert) {
	//GIVEN 
	//WHEN
	var result = this.nettoyagePhase.valid(this.game.getPlayerActif());
	//THEN
	assert.ok(result == PHASE.DEGAGEMENT);
});

QUnit.test('valid_should_returnWAIT_when_playerActifValidAndHasMoreThan7Cards', function(assert) {
	//GIVEN 
	giveCardFromDecktoHand(this.game.getPlayerActif(),8);
	//WHEN
	var result = this.nettoyagePhase.valid(this.game.getPlayerActif());
	//THEN
	assert.ok(result == PHASE.WAIT);
});


QUnit.test('isAuthorized_should_returnTrue_when_playerActifRetireCardIfMoreThan7', function(assert) {
	//GIVEN
	var player = this.game.getPlayerActif();
	giveCardFromDecktoHand(player,8);
	var card = player.hand[0];
	//WHEN
	var result = this.nettoyagePhase.isAuthorized('retirerCard', {player:this.game.getPlayerWithToken(),card:card});
	//THEN
	assert.ok(result == true);
});

QUnit.test('isAuthorized_should_returnFalse_when_playerActifRetireCardIfLessThan8', function(assert) {
	//GIVEN
	var player = this.game.getPlayerActif();
	giveCardFromDecktoHand(player,7);
	var card = player.hand[0];
	//WHEN
	var result = this.nettoyagePhase.isAuthorized('retirerCard', {player:this.game.getPlayerWithToken(),card:card});
	//THEN
	assert.ok(result == false);
});

QUnit.test('isAuthorized_should_returnFalse_when_playerNotActifValid', function(assert) {
	//GIVEN
	var player = null;
	for(var i=0;i<this.game.getPlayers().length;i++){
		if(!this.game.isPlayerActif(this.game.getPlayers()[i])) {
			player = this.game.getPlayers()[i];
			break;
		}
	}
	//WHEN
	var result = this.nettoyagePhase.isAuthorized('valid', {player:player});
	//THEN
	assert.ok(result == false);
});

QUnit.test('isAuthorized_should_returnTrue_when_playerActifValid', function(assert) {
	//GIVEN
	//WHEN
	var result = this.nettoyagePhase.isAuthorized('valid', {player:this.game.getPlayerActif()});
	//THEN
	assert.ok(result == true);
});