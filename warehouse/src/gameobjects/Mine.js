/**
 * Repésente une mine
 */
class Mine extends Node {

	constructor(game, image) {
		super(game, image, 0, 1);
	}

	getItem() {
		var item =  new Item(this.game,'billegreen');
		item.x = this.x;
		item.y = this.y;
		return item;
	}

} 