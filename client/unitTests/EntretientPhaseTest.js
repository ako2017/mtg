QUnit.test('validAllPlayerShouldReturnPIOCHE', function(assert) {
	//GIVEN
	var entretientPhase = new EntretientPhase(null);
	var player = createPlayer('p1');
	entretientPhase.checkAllPass = function() {
		return true;
	};
	//WHEN
	var result = entretientPhase.valid(player);
	//THEN
	assert.ok(result == PHASE.PIOCHE, 'on retourne PIOCHE');
});