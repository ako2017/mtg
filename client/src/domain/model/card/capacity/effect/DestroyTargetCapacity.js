class DestroyTarget extends Effet {
	constructor(card) {
		super(card);
		this.target = null;
	}
	
	execute() {
		this.target.destroy();
	}
}