class GameState {
	constructor() {
		this.link = null;
	}

	create() {
		var node = this.game.add.existing(new Mine(this.game,'billeblue'));
		var node2 = this.game.add.existing(new Extracteur(this.game,'billered'));
		node2.x=45;
		node2.y=45;
		this.link = new Link(node,node2);
		

	}

	update() {
	
	}

	render() {
		this.game.debug.geom(this.link);
	}

	initPhysicSystem() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 100;
	}

}