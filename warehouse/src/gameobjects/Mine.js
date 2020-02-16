/**
 * Repésente une mine
 */
class Mine extends Machine {

	constructor(game, image) {
		super(game, image);
		this.addOutputNode(20,0,image,1);
	}

	getItem() {
		var item =  new Item(this.game,'billegreen');
		item.x = this.x;
		item.y = this.y;
		return item;
	}

} 