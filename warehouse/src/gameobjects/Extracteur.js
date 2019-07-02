/**
 * Repésente un extracteur
 */
class Extracteur extends Node {

	constructor(game, image) {
		super(game, image, 1, 1);
	}

	update() {

	}

	addItem(item) {
		super.addItem(item);
		this.output[0].addItem(item);
	}

} 