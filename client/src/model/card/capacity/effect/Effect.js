class Effect {
	constructor(targetValidator) {
		this.capacity = null;
		this.targetValidator = targetValidator;
		this.cibles = [];
	}

	setCapacity(capacity) {
		this.capacity = capacity;
	}
	
	getCard() {
		return this.capacity.getCard();
	}

	execute() {
		
	}

	needCible() {
		this.targetValidator != null;
	}

	waitInfo() {
		return this.needCible() && this.cibles.length == 0;
	}

	setCible(cibles) {
		if(this.targetValidator(cibles)) {
			this.cibles = cibles;
			return true;
		}
		return false;
	}

}