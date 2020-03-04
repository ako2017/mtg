/**
 * Repésente une mine
 */
class NodeCounter extends Node {

	constructor(game, isInput, type) {
		super(game, isInput, type);
		this.itemCounter = 0;
	}

	getNbItem() {
		return this.itemCounter;
	}

	popItem() {
		this.itemCounter--;
		var item =  new Item(this.game,'billegreen');
		item.x = this.x;
		item.y = this.y;
		this.game.add.existing(item);
		return item;
	}

	addItem(item) {
		this.itemCounter++;
	}

} 