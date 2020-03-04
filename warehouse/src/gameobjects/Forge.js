/**
 * Repésente une mine
 */
class Forge extends Machine {

	constructor(game, image) {
		super(game, image);

		this.timer = 0;
		this.addInputNode(-20,0,1,0);
		//this.inputs[0].maxItem=10;
		this.addOutputNode(20,0,2,0);
	}

	update() {
		if(this.inputs[0].getNbItem()>1 && this.game.time.totalElapsedSeconds() > this.timer) {
			this.inputs[0].popItem().kill();
			this.inputs[0].popItem().kill();
			this.outputs[0].addItem(this.getItem());
			this.timer = this.game.time.totalElapsedSeconds()+10;
		}
	}

	getItem() {
		var item =  new Item(this.game,'billegreen');
		item.x = this.x;
		item.y = this.y;
		return item;
	}

} 