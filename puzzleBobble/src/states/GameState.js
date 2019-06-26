class GameState {
	constructor() {
		this.cursors = null;
		this.lanceur = null;
		this.currentBille = null;
		this.billes = null;
		this.billesAr = null;
	}

	create() {
		this.billes = this.game.add.group();
		var w= Math.floor(this.game.width/32);
		var h= Math.floor(this.game.height/32);
		this.billesAr = Array(h).fill(0).map(x => Array(w).fill(null));
		this.initPhysicSystem();
		this.creationCursors();
		this.creationWalls();
		this.creationLanceur();
	}

	update() {
		this.handleInput();
		this.handleCollision();
	}

	render() {
		this.billes.forEach(function(item) {
			this.game.debug.body(item);
		},this);
		
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
			this.game.add.existing(this.currentBille);
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
			bille.checkWorldBounds = false;	
			bille.body.velocity.x=0;
			bille.body.velocity.y=0;
			bille.body.x= this.math.snapToFloor(bille.x,32);
			bille.body.y=0;
			if(this.currentBille) {
				this.billes.add(this.currentBille);
				this.billesAr[0][bille.body.x/32] = this.currentBille;
			}
			this.currentBille = null;
		}
	}

	handleCollisionWithBilles() {
		this.game.physics.arcade.overlap(this.currentBille, this.billes, this.onCollisionBille, null, this);
	}

	onCollisionBille(billeA, billeB) {
			var deg = this.game.math.radToDeg(this.game.physics.arcade.angleBetween(billeB,billeA));

			deg = (deg<0)?-deg:360-deg;

			console.log(deg);
			billeA.checkWorldBounds = false;	
			billeA.body.velocity.x=0;
			billeA.body.velocity.y=0;

			var x=0;
			var y=0;


			console.log("billeB:"+ billeB.body.x + "billeB:"+ billeB.x);
			if(deg>315) {
				y=billeB.body.y;
				x=billeB.body.x+32;
			}
			else if(deg>270) {
				y=billeB.body.y+32;
				x=billeB.body.x+16;
				if(this.game.math.isOdd(y/32)) {
					console.log("right odd");
					if((x/32)==0) {
						console.log("right odd correction");
						x=billeB.body.x-16;
					}
				}
			}
			else if(deg>225) {
				y=billeB.body.y+32;
				x=billeB.body.x-16;
				if(this.game.math.isOdd(y/32)) {
					console.log("left odd:" + x + "x/32:"+(x/32));
					if((x/32)==0) {
						console.log("left odd correction");
						x=billeB.body.x+16;
					}
				}
			}
			else if(deg>135){
				y=billeB.body.y;
				x=billeB.body.x-32;
			}
			else {
				y=billeB.body.y;
				x=billeB.body.x+32;
			}
			billeA.x=x;
			billeA.y=y+16;
			console.log("bax:"+x+"bay:"+(y+16));
			this.billesAr[billeA.y/32][billeA.x/32] = billeA;
			this.billes.add(billeA);
			this.currentBille = null;
	}

	/*onCollisionBille(billeA, billeB) {
		var deg = this.game.math.radToDeg(this.game.physics.arcade.angleBetween(billeB,billeA));

		deg = (deg<0)?-deg:360-deg;

		console.log(deg);
		billeA.checkWorldBounds = false;	
		billeA.body.velocity.x=0;
		billeA.body.velocity.y=0;

		var x=0;
		var y=0;


		console.log("billeB:"+ billeB.body.x + "billeB:"+ billeB.x);
		if(deg>315) {
			y=billeB.body.y;
			x=billeB.body.x+32;
		}
		else if(deg>270) {
			y=billeB.body.y+32;
			x=billeB.body.x+16;
			if(this.game.math.isOdd(y/32)) {
				console.log("right odd");
				if((x/32)==0) {
					console.log("right odd correction");
					x=billeB.body.x-16;
				}
			}
		}
		else if(deg>225) {
			y=billeB.body.y+32;
			x=billeB.body.x-16;
			if(this.game.math.isOdd(y/32)) {
				console.log("left odd:" + x + "x/32:"+(x/32));
				if((x/32)==0) {
					console.log("left odd correction");
					x=billeB.body.x+16;
				}
			}
		}
		else if(deg>135){
			y=billeB.body.y;
			x=billeB.body.x-32;
		}
		else {
			y=billeB.body.y;
			x=billeB.body.x+32;
		}
		billeA.body.x=x;
		billeA.body.y=y;
		this.billesAr[billeA.body.y/32][billeA.body.x/32] = billeA;
		this.billes.add(billeA);
		this.currentBille = null;
}*/

}