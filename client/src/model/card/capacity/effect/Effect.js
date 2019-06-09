class Effect {
	constructor() {
		this.capacity = null;
	}

	setCapacity(capacity) {
		this.capacity = capacity;
	}

	getCapacity() {
		return this.capacity;
	}

	getTargets() {
		return this.getCapacity().targets;
	}
	
	getCard() {
		return this.capacity.getCard();
	}

	execute() {
		
	}

	needCible() {
		this.targetValidator != null;
	}

}