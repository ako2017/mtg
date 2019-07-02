/**
 * Repésente un lien enter 2 noeuds
 */
class Link extends Phaser.Line {

	constructor(nodeA, nodeB) {
		super(nodeA.x,nodeA.y,nodeB.x,nodeB.y);
		this.nodeA = nodeA;
		this.nodeB = nodeB;
		this.items = [];
	}

	update() {
		this.fromSprite(this.nodeA, this.nodeB, true);
	}

	addItem(item) {
		this.items.push(item);
	}

	transfertItem() {
		this.nodeB.addItem(this.items.pop());
	}

} 