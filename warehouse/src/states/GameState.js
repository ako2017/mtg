class GameState {
	constructor() {
		this.links = [];
	}

	create() {

		for(let i=0;i<20;i++) {
			var mineA = this.game.add.existing(new Mine(this.game,'billeblue'));
			mineA.x=this.game.rnd.integerInRange(0,this.game.width);
			mineA.y=this.game.rnd.integerInRange(0,this.game.height);
			var extracteurA = this.game.add.existing(new Extracteur(this.game,'billered'));
			extracteurA.x=this.game.rnd.integerInRange(0,this.game.width);
			extracteurA.y=this.game.rnd.integerInRange(0,this.game.height);
			var stockerNode = this.game.add.existing(new Stocker(this.game,'billered'));
			stockerNode.x=this.game.rnd.integerInRange(0,this.game.width);
			stockerNode.y=this.game.rnd.integerInRange(0,this.game.height);

			this.links.push(new Link(this.game, mineA,extracteurA,0,0));
			this.links.push(new Link(this.game, extracteurA,stockerNode,0,0));
		

			var mineNode = this.game.add.existing(new Mine(this.game,'billeblue'));
			mineNode.x=this.game.rnd.integerInRange(0,this.game.width);
			mineNode.y=this.game.rnd.integerInRange(0,this.game.height);

			var extracteurNode = this.game.add.existing(new Extracteur(this.game,'billered'));
			extracteurNode.x=this.game.rnd.integerInRange(0,this.game.width);
			extracteurNode.y=this.game.rnd.integerInRange(0,this.game.height);

			var forgeNode = this.game.add.existing(new Forge(this.game,'billered'));
			forgeNode.x=this.game.rnd.integerInRange(0,this.game.width);
			forgeNode.y=this.game.rnd.integerInRange(0,this.game.height);

			var stockageNode = this.game.add.existing(new Stocker(this.game,'billered'));
			stockageNode.x=this.game.rnd.integerInRange(0,this.game.width);
			stockageNode.y=this.game.rnd.integerInRange(0,this.game.height);

			this.links.push(new Link(this.game, mineNode,extracteurNode,0,0));
			this.links.push(new Link(this.game, extracteurNode,forgeNode,0,0));
			this.links.push(new Link(this.game, forgeNode,stockageNode,0,0));
		}

		
	
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