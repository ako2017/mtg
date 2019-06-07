class Stack extends Observable {
	constructor() {
		super();
		this.stack = [];
		this.currentSort = null;
		this.capacityToAdd = [];
		this.iter = null;
		this.resultResolve = null;
	}

	/**
	 * Résout un sort de la pile
	 * Tant que le sort courant n'est pas résolu on ne peut pas faire d'autre action dans le jeu
	 * @param {Game} game 
	 * @returns true si il a été résolu
	 */
	resolve(game) {
		if(!this.isResolving()) {
			this.iter = this.subResolve(game);
		}
		this.resultResolve = this.iter.next();
	}

	isResolving() {
		return this.resultResolve != null && !this.resultResolve.done;
	}

	*subResolve(game) {
		this.currentSort = this.stack.pop();
		yield* this.currentSort.resolve(game);
		console.log('on fait les evt apres resolution');
		if(this.currentSort.getType() == TypeCard.CREATURE) {
			this.addCapacitiesByTrigger(GameEvent.ON_ENTER_BATTLEFIELD,this.currentCard, game.players);
		}
	}

	setResponse(response) {
		this.iter.next(response);
	}

	waitResponse() {
		return !this.resultResolve.done && this.resultResolve.value.prompt;
	}
	
	addCapacitiesByTrigger(trigger, card, players) {
		for (var i = 0; i < players.length; i++) {
			var battlefield = players[i].battlefield;
			for (var j = 0; j < battlefield.length; j++) {
				var capacity = battlefield[j].getCapacityByTrigger(trigger,card);
				if(capacity) {
					this.push(capacity);
				}
			}
		}
	}
	
	push(card) {
		var sort = new Sort(card);
		this.stack.push(sort);
		sendEvent(GameEvent.STACK_CARD,{card:card},this);
	}

	needCible() {
		var result = this.waitInfo();
		return result.result && result.typeInfo == 'target';
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

	waitInfo() {
		if(this.currentSort != null) {
			return this.currentSort.waitInfo();
		}
		else if(this.stack.length != 0) {
			var elt = this.stack[this.stack.length-1];
			return elt.waitInfo();
		}
		return {result:false};
	}
}