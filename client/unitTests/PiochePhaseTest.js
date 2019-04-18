QUnit.test('executeShouldGiveNoCardToFirstPlayer', function(assert) {
	//GIVEN
	var piochePhase = new PiochePhase(null);
	var player = createPlayer('p1');
	piochePhase.getPlayerActif = function() {
		return player;
	};
	//WHEN
	piochePhase.execute();
	//THEN
	assert.ok(player.hand.length == 0, 'pas de carte');
});

QUnit.test('executeShouldGiveOneCardToPlayer', function(assert) {
	//GIVEN
	var piochePhase = new PiochePhase(null);
	piochePhase.firstPioche = false;
	var player = createPlayer('p1');
	piochePhase.getPlayerActif = function() {
		return player;
	};
	//WHEN
	piochePhase.execute();
	//THEN
	assert.ok(player.hand.length == 1, 'nouvelle carte');
});