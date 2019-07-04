/**
 * Repésente un lien enter 2 noeuds
 */
class Link extends Phaser.Line {

	constructor(game,nodeA, nodeB,outputA,inputB) {
		super(nodeA.x,nodeA.y,nodeB.x,nodeB.y);
		this.nodeA = nodeA;
		this.nodeB = nodeB;
		nodeA.outputs[outputA] = this;
		nodeB.inputs[inputB] = this;
		this.items = [];
		this.game = game;
	}

	addItem(item) {
		this.items.push(item);
		this.game.add.tween(item).to({x:this.nodeB.x,y:this.nodeB.y},2000,Phaser.Easing.Linear.None,true)
		.onComplete.add(function(){
			this.transfertItem(item);
		},this);		
	}

	transfertItem(item) {
		this.nodeB.addItem(this.items.removeByValue(item));
	}

} 