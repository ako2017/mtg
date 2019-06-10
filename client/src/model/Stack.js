class Stack extends Observable {
	constructor() {
		super();
		this.stack = [];
		this.currentSort = null;
		this.capacityToAdd = [];
		this.resolving = false;
		this.game = null;
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
		yield* this.addCapacitiesByTrigger();
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
	
	*addCapacitiesByTrigger() {
		for (var i = 0; i < this.capacityToAdd.length; i++) {
			yield* this.askAndStack(this.capacityToAdd[i]);
		}
	}
	
	capacitiesByTriggerToAdd(trigger, card, players) {
		for (var i = 0; i < players.length; i++) {
			var battlefield = players[i].battlefield;
			for (var j = 0; j < battlefield.length; j++) {
				var capacity = battlefield[j].getCapacityByTrigger(trigger,card);
				if(capacity) {
					this.capacityToAdd.push(capacity);
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

	onReceive(event) {
		switch(event.type) {
			case GameEvent.ENTER_BATTLEFIELD:
				this.capacitiesByTriggerToAdd(event.type, event.data.card, this.game.getPlayers());
				break;
			case GameEvent.CARD_DIE:
				this.capacitiesByTriggerToAdd(event.type, event.data.card, this.game.getPlayers());
				break;
		}		
	}
}