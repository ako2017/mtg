/**
 * Repésente une mine
 */
class NodeCounter extends Node {

	constructor(game, isInput, type) {
		super(game, '', isInput, type);
		this.itemCounter = 0;
	}

	popItem() {
		this.itemCounter--;
		var item =  new Item(this.game,'billegreen');
		item.x = this.x;
		item.y = this.y;
		return item;
	}

	addItem(item) {
		this.itemCounter++;
	}

} 