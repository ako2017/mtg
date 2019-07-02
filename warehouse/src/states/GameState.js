class GameState {
	constructor() {
		this.links = [];
	}

	create() {
		var node = this.game.add.existing(new Mine(this.game,'billeblue'));
		var node2 = this.game.add.existing(new Extracteur(this.game,'billered'));
		var stkNode = this.game.add.existing(new Stocker(this.game,'billered'));
		stkNode.x=400;
		stkNode.y=400;
		node2.x=200;
		node2.y=300;
		this.links.push(new Link(this.game, node,node2,0,0));
		this.links.push(new Link(this.game, node2,stkNode,0,0));
	}

	update() {
	
	}

	render() {
		this.links.forEach(function(item) {
			this.game.debug.geom(item);
		},this);
	}

	initPhysicSystem() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	}

}