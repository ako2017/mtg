class GameState {
	constructor() {
		this.cursors = null;
		this.lanceur = null;
		this.currentBille = null;
	}

	create() {
		this.initPhysicSystem();
		this.creationCursors();
		this.creationWalls();
		this.creationLanceur();
	}

	update() {
		this.handleInput();
		this.handleCollision();
	}

	initPhysicSystem() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	}

	creationCursors() {
		this.cursors = this.game.input.keyboard.createCursorKeys();
	}

	creationWalls() {

	}

	creationLanceur() {
		this.lanceur = new Lanceur(this.game);
		this.lanceur.x = this.game.width/2;
		this.lanceur.y = this.game.height;
		this.game.add.existing(this.lanceur);
	}



	handleInput() {
		if(this.cursors.left.isDown) {
			this.lanceur.moveLeft();
		}
		if(this.cursors.right.isDown) {
			this.lanceur.moveRight();
		}
		
		if(this.cursors.up.isDown && this.currentBille == null) {
			this.currentBille = this.lanceur.fire();
			this.currentBille.events.onEnterBounds.add(this.hitWorldBounds, this);
		}
	}

	handleCollision() {
		if(this.currentBille != null) {
			this.handleCollisionWithBilles();
		}
	}

	hitWorldBounds(bille) {
		alert('touche');
	}

	handleCollisionWithBilles() {

	}

}