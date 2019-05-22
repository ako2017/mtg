QUnit.module( "DistributionPhase" );

QUnit.test('should_returnPioche_when_allPlayerValid', function(assert) {
	//GIVEN
	var game = new Game();
	var player = createPlayer('p1');
	game.addPlayer(player);
	var player2 = createPlayer('p2');
	game.addPlayer(player2);
	var distributionPhase = new DistributionPhase(game.pm); 
	//WHEN
	var result = entretientPhase.valid(player);
	result = entretientPhase.valid(player2);
	//THEN
	assert.ok(result == PHASE.PIOCHE, 'on retourne PIOCHE');
});