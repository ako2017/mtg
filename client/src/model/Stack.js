Stack = function(board) {
	Observable.call(this);
	this.stack = [];
	this.board = board
	this.current = null;
};

Stack.prototype = Object.create(Observable.prototype);

Stack.prototype.resolve = function() {
	if (this.current == null || this.current.isFinished()) {
		this.current = this.stack.pop();
	}

	if (this.current != null) {
		if (this.current.typeC == TypeCard.CREATURE) {
			var capacities = this.current.getCapacityActive();

			capacities.push();
			current.onEnterBattlefield();
			var event = {};
			event.type = GameEvent.ENTER_BATTLEFIELD;
			event.data = {
				card : current
			};
			this.notify(event);

			this.stack.push(capacities);
		} else if (this.current.typeC == TypeCard.CAPACITY) {
			if (this.current.execute({
				board : this.board
			})) {
				this.board.mode.push(MODE.PRIORITY_RUN);
			}
		}
	}
	return this.current != null;
	;
};

Stack.prototype.push = function(card) {
	this.stack.push(card);
	if (this.board.mode.length == 0)
		this.board.mode.push(Mode.RESOLVE_STACK);
	if (card.typeC == TypeCard.CAPACITY && card.cibleRule != null) {
		this.board.selectCard(card.cibleRule);
	}
	// this.board.letPlayerDoSth();
};