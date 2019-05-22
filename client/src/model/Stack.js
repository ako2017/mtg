class Stack extends Observable {
	constructor() {
		super();
		this.stack = [];
	}

	resolve(game) {
		var current = this.stack.pop();
	
		if (current != undefined) {
			switch(current.type) {
			case TypeCard.CREATURE :
				current.enterBattlefield();
				this.addCapacitiesByTrigger(GameEvent.ON_ENTER_BATTLEFIELD,current, game.players);
				this.resolve(game);
				break;
			case TypeCard.CAPACITY :
				current.execute({game : game});
				break;
			case TypeCard.EPHEMERE :
				var capacity = current.capacities[0];
				capacity.execute({game : game});
				current.gotoCemetery();
				break;
			}
		}
	}
	
	addCapacitiesByTrigger(trigger, card, players) {
		for (var i = 0; i < players.length; i++) {
			var battlefield = players[i].battlefield;
			for (var j = 0; j < battlefield.length; j++) {
				var capacity = battlefield[j].getCapacityByTrigger(trigger,card);
				if (capacity) {
					this.push(capacity);
				}
			}
		}
	}
	
	push(card) {
		this.stack.push(card);
		sendEvent(GameEvent.STACK_CARD,{card:card},this);
	}
	
	validCible(cards) {
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
	
	isValidCible(cibles) {
		var elt = this.stack[this.stack.length-1];
		return elt.isValidCible(cibles);
	}
	
	setCible(cibles) {
		var elt = this.stack[this.stack.length-1];
		elt.setCibles(cibles);
	}
	
	containsType(type) {
		for (var i = 0; i < this.stack.length; i++) {
			var element = this.stack[i];
			if (element.type == type) {
				return true;
			}
		}
		return false;
	}
	
	needCible() {
		if(this.stack.length != 0) {
			var elt = this.stack[this.stack.length-1];
			return elt.type == TypeCard.CAPACITY && elt.needCible();
		}
		return false;
	}
	
	isEmpty() {
		return this.stack.length == 0;
	}
}