QUnit.test('on pose un terrain', function(assert) {
	//GIVEN
	var player = new Player();
	var stack = new Stack();
	var terrainCard = createCardTerrain(player);
	player.hand.push(terrainCard);
	player.hand.push(createCardCreature(player));
	//WHEN
	player.poseCard(terrainCard,stack);
	//THEN
	assert.ok(player.hand.length == 1, 'reste une carte en main');
	assert.ok(player.hand[0].type == TypeCard.CREATURE, 'reste une creature en main');

});

QUnit.test('on pose une creature', function(assert) {
	//GIVEN
	var player = new Player();
	var stack = new Stack();
	var creatureCard = createCardCreature(player);
	player.hand.push(createCardTerrain(player));
	player.hand.push(creatureCard);
	//WHEN
	player.poseCard(creatureCard,stack);
	//THEN
	assert.ok(player.hand.length == 1, 'reste une carte en main');
	assert.ok(player.hand[0].type == TypeCard.TERRAIN, 'reste un terrain en main');

});


QUnit.test('on fait un muligane', function(assert) {
	//GIVEN
	var player = createPlayer('p1');
	//WHEN
	player.muligane();
	//THEN
	assert.ok(false);
});

