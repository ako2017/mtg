QUnit.module( "PiochePhase" );

QUnit.test('execute_should_giveNoCard_forFirstPioche', function(assert) {
	//GIVEN
	var game = new Game();
	var player = createPlayer('p1');
	game.addPlayer(player);
	var player2 = createPlayer('p2');
	game.addPlayer(player2);
	var piochePhase = new PiochePhase(game.pm); 
	//WHEN
	piochePhase.execute();
	//THEN
	assert.ok(player.hand.length == 0, 'pas de carte');
});

QUnit.test('execute_should_giveOneCard_forPlayerActif', function(assert) {
	//GIVEN
	var game = new Game();
	game.addPlayer(createPlayer('p1'));
	game.addPlayer(createPlayer('p2'));
	var piochePhase = new PiochePhase(game.pm);
	//WHEN
	piochePhase.execute();
	piochePhase.execute();
	//THEN
	assert.ok(game.getPlayerActif().hand.length == 1, 'nouvelle carte');
});