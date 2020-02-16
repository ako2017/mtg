class GameState {
	constructor() {
		this.links = [];
		this.nodeGroup = null;
	}

	create() {
		this.game.linkHandler = new LinkHandler(this.game);
		this.nodeGroup = this.game.add.group();
		this.game.linkHandler.nodeGroup = this.nodeGroup;
		this.game.linkHandler.links = this.links;
		
		for(let i=0;i<1;i++) {
			var mineA = this.nodeGroup.add(new Mine(this.game,'billeblue'));
			mineA.x=this.game.rnd.integerInRange(0,this.game.width);
			mineA.y=this.game.rnd.integerInRange(0,this.game.height);
			var extracteurA = this.nodeGroup.add(new Extracteur(this.game,'billered'));
			extracteurA.x=this.game.rnd.integerInRange(0,this.game.width);
			extracteurA.y=this.game.rnd.integerInRange(0,this.game.height);
			var stockerNode = this.nodeGroup.add(new Stocker(this.game,'billered'));
			stockerNode.x=this.game.rnd.integerInRange(0,this.game.width);
			stockerNode.y=this.game.rnd.integerInRange(0,this.game.height);
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