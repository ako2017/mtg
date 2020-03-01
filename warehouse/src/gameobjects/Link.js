/**
 * Repésente un lien enter 2 noeuds
 */
class Link extends Phaser.Line {

	constructor(game,nodeA, nodeB) {
		super(nodeA.world.x,nodeA.world.y,nodeB.world.x,nodeB.world.y);
		this.nodeA = nodeA;
		this.nodeB = nodeB;
		this.items = [];
		this.game = game;
	}

	addItem(item) {
		this.items.push(item);
		item.x = this.nodeA.world.x;
		item.y = this.nodeA.world.y;
		this.game.add.tween(item).to({x:this.nodeB.world.x,y:this.nodeB.world.y},2000,Phaser.Easing.Linear.None,true)
		.onComplete.add(function(){
			this.transfertItem(item);
		},this);		
	}

	calculLine() {
		this.setTo(this.nodeA.world.x,this.nodeA.world.y,this.nodeB.world.x,this.nodeB.world.y);
	}

	isFull() {
		return this.nodeB.isFull();
	}

	transfertItem(item) {
		this.nodeB.addItem(this.items.removeByValue(item));
	}

} 