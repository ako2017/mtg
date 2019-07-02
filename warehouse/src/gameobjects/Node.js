/**
 * Repésente un noeud
 */
class Node extends Phaser.Sprite {

	constructor(game, image, nbInput, nbOutput) {
		super(game,0,0,image);
		this.anchor.set(0.5,0.5);

		this.input = new Array(nbInput);
		this.output = new Array(nbOutput);
		this.items = [];
	}

	addItem(item) {
		this.items.push(item);
	}

} 