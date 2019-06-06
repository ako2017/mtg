class AddLifeEffect extends Effect {
	constructor(cibleValidator,life) {
		super(cibleValidator);
		this.life = life;
	}
	
	*execute() {
		yield this.getCard().owner.addLife(this.life);
		alert('on continue la resolution de l"effet :)');
	}
}