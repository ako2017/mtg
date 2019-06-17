class SendCardToCemeteryEffect extends Effect {
	constructor(cibleValidator) {
		super(cibleValidator);
	}
	
	*execute() {
		this.targets[0].gotoCemetery();
	}
}

module.exports = SendCardToCemeteryEffect;