/**
 * Repésente une mine
 */
class Forge extends Machine {

	constructor(game, image) {
		super(game, image);

		this.timer = 0;
		this.addInputNode(-20,0,image,1);
		this.addOutputNode(20,0,image,2);
	}

	update() {
		if(this.inputs[0].items.length>1 && this.game.time.totalElapsedSeconds() > this.timer) {
			this.inputs[0].items.pop().kill();
			this.inputs[0].items.pop().kill();
			this.outputs[0].addItem(this.getItem());
			this.timer = this.game.time.totalElapsedSeconds()+20;
		}
	}

	getItem() {
		var item =  new Item(this.game,'billegreen');
		item.x = this.x;
		item.y = this.y;
		return item;
	}

} 