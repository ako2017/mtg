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

QUnit.test('testIterator', function(assert) {
	//GIVEN
	this.game.getPlayerActif().life = 0;
	this.game.getPlayerActif().battlefield.push(createCreatureTriggerOnEnterBattlefieldAddOneLife(this.game.getPlayerActif()));
	var card = createCreatureTriggerOnEnterBattlefieldAddOneLife(this.game.getPlayerActif());
	this.stack.push(card.capacities[0]);
	//WHEN
	var iter = this.stack.resolve(this.game);
	var response = iter.next();
	console.log('attente de reponse?' + response.value.prompt);
	iter.next(10);
	//THEN
	assert.ok(this.game.getPlayerActif().life == 10);
});

QUnit.test('addMarqueurToTarget', function(assert) {
	//GIVEN
	var card = createCreatureAddOneLife(this.game.getPlayerActif());
	this.game.getPlayerActif().battlefield.push(card);
	var capacity = new Capacity([0,0,0,0,0],null,new Prompt('tes',function(value){return true;}));
	var effect = new AddMarqueurEffect(2,3,TimeToLive.INF);
	capacity.addEffect(effect);
	var iter = this.stack.askAndStack(capacity);
	iter.next();
	iter.next([card]);
	//WHEN
	iter = this.stack.resolve(this.game);
	iter.next();
	//THEN
	assert.ok(card.getForce() == 2);
});