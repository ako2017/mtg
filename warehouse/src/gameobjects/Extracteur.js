/**
 * Repésente un extracteur
 */
class Extracteur extends Node {

	constructor(game, image) {
		super(game, image, 1, 1);
		this.timer = 0;
	}

	update() {
		while(this.items.length>0) {
			this.outputs[0].addItem(this.items.pop());
		}
		if(this.game.time.totalElapsedSeconds() > this.timer) {
			var item = this.inputs[0].nodeA.getItem();
			this.inputs[0].addItem(this.game.add.existing(item));
			this.timer = this.game.time.totalElapsedSeconds()+5;
		}
	}

} 