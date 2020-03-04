/**
 * Repésente un extracteur
 */
class Extracteur extends Machine {

	constructor(game, image) {
		super(game, image);
		this.timer = 0;

		this.addInputNode(-20,0,1,0);
		this.addOutputNode(20,0,1,0);
	}

	update() {
		super.update();
		if(!this.isWorking()) return;

		if(this.game.time.totalElapsedSeconds() > this.timer) {
			this.outputs[0].addItem(this.inputs[0].link.nodeA.popItem());
			this.timer = this.game.time.totalElapsedSeconds()+5;
		}
	}

} 