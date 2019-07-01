/**
 * Repésente un extracteur
 */
class Extracteur extends Node {

	constructor(game, image) {
		super(game, image, 1, 1);
	}

	update() {
		while(this.items.length > 0) {
			this.output[0].addItem(this.items.pop());
		}
	}

} 