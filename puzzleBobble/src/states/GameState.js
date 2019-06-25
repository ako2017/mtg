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
			this.currentBille.body.onWorldBounds = new Phaser.Signal();
			this.currentBille.body.onWorldBounds.add(this.hitWorldBounds, this);
		}
	}

	handleCollision() {
		if(this.currentBille != null) {
			this.handleCollisionWithBilles();
		}
	}

	hitWorldBounds(bille, up, down, left, right) {
		if(up) {
			console.log('ee');
			//bille.body.enable=false;
			bille.checkWorldBounds = false;
			
			bille.body.velocity.x=0;
			bille.body.velocity.y=0;
			//bille.x = this.math.snapToFloor(bille.x,32);
			//bille.y=16;
			bille.body.x= this.math.snapToFloor(bille.x,32);
			bille.body.y=16
			this.currentBille = null;
		}
	}

	handleCollisionWithBilles() {

	}

}