Stack = function() {
	Observable.call(this);
	this.stack = [];
};

Stack.prototype = Object.create(Observable.prototype);

Stack.prototype.resolve = function(game) {
	var current = this.stack.pop();

	if (current != undefined) {
		switch(current.type) {
		case TypeCard.CREATURE :
			var capacity = current.getCapacityByTrigger(GameEvent.ON_ENTER_BATTLEFIELD);
			if(capacity) this.push(capacity);
			this.capacities = this.getCapacitiesByTrigger(GameEvent.ON_ENTER_BATTLEFIELD,current, game.players);
			Array.prototype.push.apply(this.stack, capacities);
			break;
		case TypeCard.CAPACITY :
			this.current.execute({game : game});
			break;
		case TypeCard.EPHEMERE :
			//var capacity = current.getCapacityByTrigger(GameEvent.STATIC);
			var capacity = current.capacities[0];
			capacity.execute({game : game});
			break;
		}
	}
};

Stack.prototype.getCapacitiesByTrigger = function(trigger, card, players) {
	var capacities = [];
	for (var i = 0; i < players[i]; i++) {
		var battlefield = players[i].battlefield;
		for (var j = 0; j < battlefield.length; j++) {
			if (!element.capacities[i].hasMana()) {
				capacities.push(element.capacities[i]);
			}
		}
	}
	return capacities;
};

Stack.prototype.push = function(card) {
	this.stack.push(card);
};

Stack.prototype.validCible = function(cards) {
	var event = {};
	if(this.isValidCible(cards)) {
		this.setCible(cards);
		event.type = GameEvent.CIBLE_VALID;
		this.notify(event);
		return true;
	}
	event.type = GameEvent.CIBLE_INVALID;
	this.notify(event);
	return false;	
}

Stack.prototype.isValidCible = function(cibles) {
	var elt = this.stack[this.stack.length-1];
	return elt.isValidCible(cibles);
};

Stack.prototype.setCible = function(cibles) {
	var elt = this.stack[this.stack.length-1];
	elt.setCibles(cibles);
};

Stack.prototype.containsTypeInStack = function(type) {
	for (var i = 0; i < this.stack.length; i++) {
		var element = this.stack[i];
		if (element.type == type) {
			return true;
		}
	}
	return false;
};

Stack.prototype.needCible = function() {
	if(this.stack.length != 0) {
		var elt = this.stack[this.stack.length-1];
		return elt.type == TypeCard.CAPACITY && elt.needCible();
	}
	return false;
};

Stack.prototype.isEmpty = function() {
	return this.stack.length == 0;
};