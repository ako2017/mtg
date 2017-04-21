Stack = function () {
	Observable.call(this);
	this.stack = [];
	this.current = null;
};

Stack.prototype = Object.create(Observable.prototype);

Stack.prototype.resolve = function() {
	if(this.current == null || this.current.isFinished()) {
		this.current = this.stack.pop();
	}
	
	if(this.current != null) {
		if(this.current.typeC == TypeCard.CREATURE) {
			var capacities = this.current.getCapacityActive();
			/*
			  capacities.push();
			   current.onEnterBattlefield();
				var event = {};
				event.type = GameEvent.ENTER_BATTLEFIELD;
				event.data = {card:current};
				this.notify(event);	
				 */
			this.stack.push(capacities);
		}
		else if(this.current.typeC == TypeCard.CAPACITY) {
			this.current.execute({board:this});
		}
	}
	return this.current != null;
};