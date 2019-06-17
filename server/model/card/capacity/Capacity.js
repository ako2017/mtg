class Capacity {
	constructor(mana, trigger, prompt) {
		this.card = null;
		this.trigger = trigger;
		this.type = TypeCard.CAPACITY;
		this.mana = mana;
		this.effets = [];
		this.finished = true;
		this.prompt = prompt;
		this.targets = [];
	}

	setCard(card) {
		this.card = card;
	}

	getCard() {
		return this.card;
	}

	waitResponse() {
		return this.prompt != null;
	}

	*ask() {
		this.targets = yield* this.prompt.execute();
	}

	*execute(ctx) {
		this.finished = false;
		for(var i=0;i<this.effets.length;i++) {
			yield* this.effets[i].execute(ctx); 
	
		}
		this.finished = true;
	}

	addEffect(effect) {
		effect.setCapacity(this);
		this.effets.push(effect);
	}

	isFinished() {
		return this.finished;
	}
	
	isTriggerActif(trigger, source) {
		return this.trigger && this.trigger(trigger,source);
	}

	reset() {

	}
}

module.exports = Capacity;