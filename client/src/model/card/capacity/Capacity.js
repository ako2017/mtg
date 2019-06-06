class Capacity {
	constructor(mana, trigger) {
		this.card = null;
		this.trigger = trigger;
		this.type = TypeCard.CAPACITY;
		this.mana = mana;
		this.effets = [];
		this.currentEffect = null;
		this.finished = false;
	}

	setCard(card) {
		this.card = card;
	}

	getCard() {
		return this.card;
	}

	*execute(ctx) {
		for(var i=0;i<this.effets.length;i++) {
			this.currentEffect = i;
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

	setEffectNumber(effectNumber) {
		return this.effects[this.currentEffect].setEffectNumber(effectNumber);
	}
	
	setCible(cibles) {
		if(this.cibleValidator(cibles)) {
			this.cibles = cibles;
			return true;
		}
		return false;
	}

	needCible() {
		return this.currentEffect.needCible();
	}
	
	isTriggerActif(trigger, source) {
		return this.trigger && this.trigger(trigger,source);
	}

	reset() {

	}

	waitInfo() {
		if(this.waitModal()) {
			return {result:true,typeInfo:'modal'};
		}
		if(this.waitTarget()) {
			return {result:true,typeInfo:'target'};
		}
		return {result:false}; 
	}
}