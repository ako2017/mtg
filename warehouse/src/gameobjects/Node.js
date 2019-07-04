/**
 * Repésente un noeud
 */
class Node extends Phaser.Sprite {

	constructor(game, image, nbInput, nbOutput) {
		super(game,0,0,image);
		this.anchor.set(0.5,0.5);

		this.inputs = new Array(nbInput);
		this.outputs = new Array(nbOutput);
		this.items = [];

		this.inputEnabled  = true;
		this.events.onInputDown.add(this.onClick, this);
	}

	addItem(item) {
		this.items.push(item);
	}

	onClick(event) {
		$('#node-'+this.constructor.name.toLowerCase()).show();
	}

} 