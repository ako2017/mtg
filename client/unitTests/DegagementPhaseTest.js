QUnit.module( "DegagementPhase" );

QUnit.test('execute_should_returnENTRETIENT', function(assert) {
	//GIVEN
	var game = new Game();
	var player = createPlayer('p1');
	game.addPlayer(player);
	var player2 = createPlayer('p2');
	game.addPlayer(player2);
	var degagementPhase = new DegagementPhase(game.pm); 
	//WHEN
	var result = degagementPhase.execute();
	//THEN
	assert.ok(result == PHASE.ENTRETIENT, 'on retourne ENTRETIENT');
});

QUnit.test('isAuthorized_should_returnFalse_when_playerPoseCard', function(assert) {
	//GIVEN
	var game = new Game();
	var player = createPlayer('p1');
	game.addPlayer(player);
	var player2 = createPlayer('p2');
	game.addPlayer(player2);
	var degagementPhase = new DegagementPhase(game.pm); 
	//WHEN
	var result = degagementPhase.isAuthorized('poseCard', player, null);
	//THEN
	assert.ok(result == false, 'on retourne false');
});