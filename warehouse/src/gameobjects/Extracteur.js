/**
 * Repésente un extracteur
 */
class Extracteur extends Machine {

	constructor(game, image) {
		super(game, image);
		this.timer = 0;

		this.addInputNode(-20,0,image,1);
		this.addOutputNode(20,0,image,1);
	}

	update() {
		if(!this.isWorking()) return;
		while(this.inputs[0].items.length>0) {
			this.outputs[0].link.addItem(this.inputs[0].items.pop());
		}
		if(this.game.time.totalElapsedSeconds() > this.timer) {
			var item = this.inputs[0].link.nodeA.parent.getItem();
			this.inputs[0].link.addItem(this.game.add.existing(item));
			this.timer = this.game.time.totalElapsedSeconds()+5;
		}
	}

} 