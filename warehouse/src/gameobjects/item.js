/**
 * Repésente un noeud
 */
class Item extends Phaser.Sprite {

	constructor(game, image) {
		super(game,0,0,image);
		this.anchor.set(0.5,0.5);
	}
} 