class GameState {
	constructor() {
		this.cursors = null;
		this.lanceur = null;
		this.currentBille = null;
		this.billes = null;
		this.billesAr = null;
		this.line = null;
	}

	create() {
		this.line = new Phaser.Line(240,0,240,600);
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

	/*render() {
		this.billes.forEach(function(item) {
			this.game.debug.body(item);
		},this);
		this.game.debug.geom(this.line);
	}*/

	initPhysicSystem() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 100;
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
			//console.log("body:("+ bille.body.x+ ":"+bille.body.y+ ")bille:("+bille.x+ ":"+bille.y);
			bille.checkWorldBounds = false;	
			bille.body.velocity.x=0;
			bille.body.velocity.y=0;
			bille.body.x= this.math.snapToFloor(bille.body.x+16,32);
			bille.body.y=0;
			if(this.currentBille) {
				this.billes.add(this.currentBille);
				this.billesAr[0][bille.body.x/32] = this.currentBille;
				this.currentBille.posX = bille.body.x/32;
				this.currentBille.posY = 0;
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

		billeA.checkWorldBounds = false;	
		billeA.body.velocity.x=0;
		billeA.body.velocity.y=0;

		var cx=billeB.body.x+16;
		var cy=billeB.body.y+16;

		//console.log("body:("+ billeB.body.x+ ":"+billeB.body.y+ ")bille:("+billeB.x+ ":"+billeB.y);
		if(deg>315) {
			cx+=32;
		}
		else if(deg>270) {
			cx+=16;
			cy+=32;
			if(this.game.math.isOdd(Math.floor(cy/32))) {
				if(cx==480) {
					console.log("right odd correction");
					cx-=32;
				}
			}
		}
		else if(deg>225) {
			cx-=16;
			cy+=32;
			if(this.game.math.isOdd(Math.floor(cy/32))) {
				if(cx==0) {
					console.log("left odd correction");
					cx+=32;
				}
			}
		}
		else if(deg>135){
			cx-=32;
		}
		else {
			cx+=32;
		}
		billeA.body.x=cx-16;
		billeA.body.y=cy-16;
		if(this.game.math.isOdd(Math.floor(cy/32))) {
			this.billesAr[Math.floor(cy/32)][Math.floor(cx/32)-1] = billeA;
			billeA.posX=Math.floor(cx/32)-1;
			billeA.posY=Math.floor(cy/32);
		}	
		else {
			this.billesAr[Math.floor(cy/32)][Math.floor(cx/32)] = billeA;
			billeA.posX=Math.floor(cx/32);
			billeA.posY=Math.floor(cy/32);
		}
			
		this.billes.add(billeA);
		this.currentBille = null;
		var match = [];
		if(this.game.math.isOdd(Math.floor(cy/32)))
			this.handleMatch(Math.floor(cx/32)-1,Math.floor(cy/32), match);
		else
			this.handleMatch(Math.floor(cx/32),Math.floor(cy/32), match);
		console.log('match:'+match.length);
		this.billesAr.forEach(function(line){
			line.forEach(function(x){
				if(x != null) x.visited = false;
			});
		});
		if(match.length >=3) {
			match.forEach(function(bille) {
				this.billesAr[bille.posY][bille.posX] = null;		
				bille.kill();
			}, this);
			var orphans = this.findOrphan();
			console.log("orphans: " + orphans.length);
			orphans.forEach(function(bille) {
				this.billesAr[bille.posY][bille.posX] = null;		
				bille.body.allowGravity = true;
				bille.body.bounce.set(0.5);
			}, this);
			this.billesAr.forEach(function(line){
				line.forEach(function(x){
					if(x != null) x.visited = false;
				});
			});
		}

	}

	handleMatch(x,y,match) {
		if(x<0 || x>=this.billesAr[0].length || y<0 || y>=this.billesAr.length || this.billesAr[y][x] == null || this.billesAr[y][x].visited)
			return;
		this.billesAr[y][x].visited = true;
		if(match.length != 0 && match[0].type != this.billesAr[y][x].type)
			return;
		match.push(this.billesAr[y][x]);

		if(this.game.math.isOdd(y)) {
			this.handleMatch(x-1,y,match);
			this.handleMatch(x+1,y,match);
			this.handleMatch(x,y+1,match);
			this.handleMatch(x+1,y+1,match);
			this.handleMatch(x,y-1,match);
			this.handleMatch(x+1,y-1,match);
		}
		else {
			this.handleMatch(x-1,y,match);
			this.handleMatch(x+1,y,match);
			this.handleMatch(x,y+1,match);
			this.handleMatch(x-1,y+1,match);
			this.handleMatch(x,y-1,match);
			this.handleMatch(x-1,y-1,match);
		}	
	}

	findOrphan() {
		this.billesAr[0].forEach(function(bille) {
			if(bille != null) {
				this.parcoursBilles(bille.posX,bille.posY);	
			}
		}, this);
		var orphans = [];
		this.billesAr.forEach(function(line){
			line.forEach(function(x){
				if(x != null && !x.visited) {
					orphans.push(x);
				}
			});
		});
		return orphans;
	}

	parcoursBilles(x,y) {
		if(x<0 || x>=this.billesAr[0].length || y<0 || y>=this.billesAr.length || this.billesAr[y][x] == null || this.billesAr[y][x].visited)
			return;
		this.billesAr[y][x].visited = true;
		if(this.game.math.isOdd(y)) {
			this.parcoursBilles(x-1,y);
			this.parcoursBilles(x+1,y);
			this.parcoursBilles(x,y+1);
			this.parcoursBilles(x+1,y+1);
			this.parcoursBilles(x,y-1);
			this.parcoursBilles(x+1,y-1);
		}
		else {
			this.parcoursBilles(x-1,y);
			this.parcoursBilles(x+1,y);
			this.parcoursBilles(x,y+1);
			this.parcoursBilles(x-1,y+1);
			this.parcoursBilles(x,y-1);
			this.parcoursBilles(x-1,y-1);
		}	
	}

}