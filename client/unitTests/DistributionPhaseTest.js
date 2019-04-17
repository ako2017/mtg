QUnit.test('executeShouldGive7CardsToPlayer', function(assert) {
	//GIVEN
	var distributionPhase = new DistributionPhase(null); 
	var player = createPlayer('p1');
	distributionPhase.getPlayers = function() {
		return [player];
	}
	//WHEN
	distributionPhase.execute();
	//THEN
	assert.ok(player.hand.length == 7, 'on a 7 cartes');
});

QUnit.test('validShouldReturnWHO_BEGINS', function(assert) {
	//GIVEN
	var distributionPhase = new DistributionPhase(null); 
	var player = createPlayer('p1');
	var player2 = createPlayer('p2');
	distributionPhase.getPlayers = function() {
		return [player, player2];
	}
	//WHEN
	var result1 = distributionPhase.valid(player);
	var result2 = distributionPhase.valid(player2);
	//THEN
	assert.ok(result1 == PHASE.WAIT && result2 == PHASE.WHO_BEGINS, 'on retourne WHO_BEGINS');
});

QUnit.test('validShouldReturnWAIT', function(assert) {
	//GIVEN
	var distributionPhase = new DistributionPhase(null); 
	var player = createPlayer('p1');
	var player2 = createPlayer('p2');
	distributionPhase.getPlayers = function() {
		return [player, player2];
	}
	//WHEN
	var result1 = distributionPhase.valid(player);
	var result2 = distributionPhase.valid(player);
	//THEN
	assert.ok(result1 == PHASE.WAIT && result2 == PHASE.WAIT, 'on retourne WAIT');
});

QUnit.test('isAuthorizedPoseCardShouldReturnFalse', function(assert) {
	//GIVEN
	var distributionPhase = new DistributionPhase(null);
	var player = createPlayer('p1');
	//WHEN
	var result = distributionPhase.isAuthorized('poseCard', player, null);
	//THEN
	assert.ok(result == false, 'on retourne false');
});