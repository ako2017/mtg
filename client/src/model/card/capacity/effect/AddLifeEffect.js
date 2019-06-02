class AddLifeEffect extends Effect {
	constructor(cibleValidator,life) {
		super(cibleValidator);
		this.life = life;
	}
	
	execute() {
		this.getCard().owner.addLife(this.life);
	}
}