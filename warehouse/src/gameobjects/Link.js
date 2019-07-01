/**
 * Repésente un lien enter 2 noeuds
 */
class Link extends Phaser.Sprite {

	constructor(game, nodeA, nodeB) {
		super(game,0,0);
		this.nodeA = nodeA;
		this.nodeB = nodeB;
	}

} 