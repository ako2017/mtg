class Stack extends Observable {
	constructor() {
		super();
		this.stack = [];
		this.currentSort = null;
		this.capacityToAdd = [];
	}


	/**
	 * Résout un sort de la pile
	 * Tant que le sort courant n'est pas résolu on ne peut pas faire d'autre action dans le jeu
	 * @param {Game} game 
	 * @returns true si il a été résolu
	 */
	resolve(game) {
		if(this.currentSort != null && this.currentSort.isFinished() && this.isEmpty()) {
			throw "la pile est vide!";
		}
		if(this.currentSort== null || this.currentSort.isFinished()) {
			this.currentSort = this.stack.pop();
		}		
		this.currentSort.resolve(game,this);
		//
		if(this.currentSort.getType() == TypeCard.CREATURE) {
			this.addCapacitiesByTrigger(GameEvent.ON_ENTER_BATTLEFIELD,this.currentCard, game.players);
		}
	}

	/**
	 * 
	 */
	onFinishedSort() {
		//this.addCapacitiesByTrigger(GameEvent.ON_ENTER_BATTLEFIELD,this.currentCard, game.players);
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

	addCapacityUntilWait() {
		var capacity;
		do {
			capacity = this.capacityToAdd.pop();
			this.stack.push(this.capacityToAdd.pop());
		}
		while(this.capacityToAdd.length > 0 && capacity.waitInfo().resut);
	}
	
	push(card) {
		var sort = new Sort(card);
		this.stack.push(sort);
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
		if(this.needCible()) {
			var elt = this.stack[this.stack.length-1];
			return elt.setCibles(cibles);
		}
		return false;
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

	/**
	 * Sélectionne l'effet désiré d'une liste d'effets proposée par une capacité de carte
	 * @param {*} effectNumber 
	 */
	setEffectNumber(effectNumber) {
		return this.currentSort.setEffectNumber(effectNumber);
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