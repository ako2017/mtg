class Stack extends Observable {
	constructor() {
		super();
		this.stack = [];
		this.currentSort = null;
		this.capacityToAdd = [];
		this.resolving = false;
	}

	isResolving() {
		return this.resolving;
	}

	/**
	 * Résout un sort de la pile
	 * Tant que le sort courant n'est pas résolu on ne peut pas faire d'autre action dans le jeu
	 * @param {Game} game 
	 */
	*resolve(game) {
		this.resolving = true;
		this.currentSort = this.stack.pop();
		yield* this.currentSort.resolve(game);
		console.log('on fait les evt apres resolution');
		if(this.currentSort.getType() == TypeCard.CREATURE) {
			yield* this.addCapacitiesByTrigger(GameEvent.ON_ENTER_BATTLEFIELD,this.currentCard, game.players);
		}
		this.resolving = false;
	}

	setResponse(response) {
		this.iter.next(response);
	}

	waitResponse() {
		return !this.resultResolve.done && this.resultResolve.value.prompt;
	}

	*askAndStack(card) {
		if(card.type == TypeCard.EPHEMERE || card.type == TypeCard.CAPACITY) {
			if(!card.waitResponse()) {
				this.push(card);
			}
			else {
				yield* card.ask();
				this.push(card);
			}
		}
	}
	
	*addCapacitiesByTrigger(trigger, card, players) {
		for (var i = 0; i < players.length; i++) {
			var battlefield = players[i].battlefield;
			for (var j = 0; j < battlefield.length; j++) {
				var capacity = battlefield[j].getCapacityByTrigger(trigger,card);
				if(capacity) {
					yield* this.askAndStack(capacity);
				}
			}
		}
	}
	
	push(card) {
		var sort = new Sort(card);
		this.stack.push(sort);
		sendEvent(GameEvent.STACK_CARD,{card:card},this);
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
	
	isEmpty() {
		return this.stack.length == 0;
	}
}