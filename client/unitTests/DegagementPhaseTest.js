QUnit.test('executeShouldReturnENTRETIENT', function(assert) {
	//GIVEN
	var degagementPhase = new DegagementPhase(null);
	var player = createPlayer('p1');
	degagementPhase.getPlayerActif = function() {
		return player;
	};
	//WHEN
	var result = degagementPhase.execute();
	//THEN
	assert.ok(result == PHASE.ENTRETIENT, 'on retourne ENTRETIENT');
});