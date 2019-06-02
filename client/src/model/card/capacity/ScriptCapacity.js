class ScriptCapacity {
	constructor(card) {
		this.card = card;
		this.trigger = null;
		this.action = null;
		this.type = TypeCard.CAPACITY;
		this.mana = [0,0,0,0,0,0];
		this.cibleRule = null;
		this.cibles = [];
	}

	init(data) {
		this.trigger = data.trigger;
		this.action = data.action;
		this.mana = data.mana;
		this.cibleRule = data.cible;
	}

	execute(ctx) {
		eval(this.action);
	}

	isValidCible(cibles) {
		return eval(this.cibleRule);
	}

	setCible(cibles) {
		this.cibles = cibles;
	}

	needCible() {
		return this.cibleRule != null;
	}

	isTriggerActif(trigger, source) {
		if(this.trigger) {
			return eval(this.trigger);	
		}
		return false;
	}
}