QUnit.module( "DeclarationAttaquantPhase", {
	before: function() {
	  // prepare something once for all tests
	},
	beforeEach: function() {
		this.game = new Game();
		var player = createPlayer('p1');
		this.game.addPlayer(player);
		var player2 = createPlayer('p2');
		this.game.addPlayer(player2);
		this.declarationAttaquantPhase = new DeclarationAttaquantPhase(this.game.pm); 
	},
	afterEach: function() {
	  // clean up after each test
	},
	after: function() {
	  // clean up once after all tests are done
	}
});

QUnit.test('execute_shouldReturnFIN_when_playerActifHasNoAttaquant', function(assert) {
	//GIVEN
	//WHEN
	var result = this.declarationAttaquantPhase.execute();
	//THEN
	assert.ok(result == PHASE.FIN);
});

QUnit.test('execute_shouldReturnWAIT_when_playerActifHasAttaquant', function(assert) {
	//GIVEN
	var player = this.game.getPlayerActif();
	player.battlefield.push(createCardCreature(player));
	//WHEN
	var result = this.declarationAttaquantPhase.execute();
	//THEN
	assert.ok(result == PHASE.WAIT);
});

/*
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
*/
QUnit.test('isAuthorized_shouldReturnFalse_ifPlayerWithTokenPoseCardBeforeDeclarationAttaquants', function(assert) {
	//GIVEN
	//WHEN
	var result = this.declarationAttaquantPhase.isAuthorized('poseCard', this.game.getPlayerWithToken());
	//THEN
	assert.ok(result == false);
});

QUnit.test('isAuthorized_shouldReturnTrue_ifPlayerWithTokenPoseCardAfterDeclarationAttaquants', function(assert) {
	//GIVEN
	var card = createCardEphemere(this.game.getPlayerWithToken());
	this.game.getPlayerWithToken().hand.push(card);
	//WHEN
	this.declarationAttaquantPhase.valid(this.game.getPlayerWithToken());
	var result = this.declarationAttaquantPhase.isAuthorized('poseCard', {player:this.game.getPlayerWithToken(), card:card});
	//THEN
	assert.ok(result == true);
});