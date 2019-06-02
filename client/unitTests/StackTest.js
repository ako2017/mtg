QUnit.module( "Stack", {
	before: function() {
	  // prepare something once for all tests
	},
	beforeEach: function() {
		this.game = new Game();
		var player = createPlayer('p1');
		this.game.addPlayer(player);
		var player2 = createPlayer('p2');
		this.game.addPlayer(player2);
		this.stack = this.game.stack;
	},
	afterEach: function() {
	  // clean up after each test
	},
	after: function() {
	  // clean up once after all tests are done
	}
});

QUnit.test('execute_resolve_addCreatureOnBattlefield', function(assert) {
	//GIVEN
	this.game.getPlayerActif().life = 0;
	card = createCreatureAddOneLife(this.game.getPlayerActif());
	this.stack.push(card);
	//WHEN
	this.stack.resolve(this.game);
	//THEN
	assert.ok(this.game.getPlayerActif().battlefield[0] == card);
});

QUnit.test('execute_resolve_give10LifesToPlayer', function(assert) {
	//GIVEN
	this.game.getPlayerActif().life = 0;
	this.game.getPlayerActif().battlefield.push(createCreatureTriggerOnEnterBattlefieldAddOneLife(this.game.getPlayerActif()));
	this.stack.push(createCreatureAddOneLife(this.game.getPlayerActif()));
	//WHEN
	this.stack.resolve(this.game);
	this.stack.resolve(this.game);
	//THEN
	assert.ok(this.game.getPlayerActif().life == 10);
});