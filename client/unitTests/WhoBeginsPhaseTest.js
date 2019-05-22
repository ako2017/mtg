QUnit.module( "WhoBeginsPhase" );

QUnit.test('execute_shouldReturnDEGAGEMENT', function(assert) {
	//GIVEN
	var game = new Game();
	var player = createPlayer('p1');
	game.addPlayer(player);
	var player2 = createPlayer('p2');
	game.addPlayer(player2);
	var whoBeginsPhase = new WhoBeginsPhase(game.pm); 
	//WHEN
	var result = whoBeginsPhase.execute();
	//THEN
	assert.ok(result == PHASE.DEGAGEMENT, 'on retourne DEGAGEMENT');
});