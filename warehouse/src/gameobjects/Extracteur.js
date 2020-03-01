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
		super.update();
		if(!this.isWorking()) return;

		if(this.game.time.totalElapsedSeconds() > this.timer) {
			var item = this.inputs[0].link.nodeA.parent.getItem();
			this.outputs[0].addItem(this.game.add.existing(item));
			this.timer = this.game.time.totalElapsedSeconds()+5;
		}
	}

} 