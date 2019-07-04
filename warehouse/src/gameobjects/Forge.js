/**
 * Repésente une mine
 */
class Forge extends Node {

	constructor(game, image) {
		super(game, image, 1, 1);
	}

	update() {
		if(this.items.length>1) {
			this.items.pop().kill();
			this.outputs[0].addItem(this.items.pop());
		}
	}

	getItem() {
		var item =  new Item(this.game,'billegreen');
		item.x = this.x;
		item.y = this.y;
		return item;
	}

} 