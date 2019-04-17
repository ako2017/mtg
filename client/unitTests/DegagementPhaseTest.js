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

QUnit.test('isAuthorizedPoseCardShouldReturnFalse', function(assert) {
	//GIVEN
	var degagementPhase = new DegagementPhase(null);
	var player = createPlayer('p1');
	degagementPhase.getPlayerActif = function() {
		return player;
	};
	//WHEN
	var result = degagementPhase.isAuthorized('poseCard', player, null);
	//THEN
	assert.ok(result == false, 'on retourne false');
});