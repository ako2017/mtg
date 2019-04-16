QUnit.test('executeShouldReturnDEGAGEMENT', function(assert) {
	//GIVEN
	var whoBeginsPhase = new WhoBeginsPhase(null); 
	whoBeginsPhase.setPlayerActif = function() {
	};
	whoBeginsPhase.getPlayerActif = function() {
		return null;
	};
	//WHEN
	var result = whoBeginsPhase.execute();
	//THEN
	assert.ok(result == PHASE.DEGAGEMENT, 'on retourne DEGAGEMENT');
});