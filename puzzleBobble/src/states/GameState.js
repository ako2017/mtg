class GameState {
	constructor() {
		this.cursors = null;
		this.lanceur = null;
		this.currentBille = null;
	}

	create() {
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.creationWalls();
		this.creationLanceur();
	}

	creationWalls() {

	}

	creationLanceur() {
		this.lanceur = new Lanceur(this.game);
		this.lanceur.x = this.game.width/2;
		this.lanceur.y = this.game.height;
		this.game.add.existing(this.lanceur);
	}

	update() {
		if(this.cursors.left.isDown) {
			this.lanceur.moveLeft();
		}
		if(this.cursors.right.isDown) {
			this.lanceur.moveRight();
		}
		if(this.cursors.up.isDown && this.currentBille == null ) {
			this.currentBille = this.lanceur.fire();
		}
	}

}