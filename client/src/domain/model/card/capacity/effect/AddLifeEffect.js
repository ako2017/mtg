class AddLifeEffect extends Effect {
	constructor(life) {
		super();
		this.life = life;
	}
	
	*execute() {
		let prompt = new Prompt('entrez un chiffre:',function(value) {return value>0;});
		let maValeur = yield* prompt.execute();
		this.getCard().owner.addLife(maValeur);
		console.log('on continue la resolution de l"effet :)');
	}
}