/**
 * Repésente une mine
 */
class Mine extends Node {

	constructor(game, image) {
		super(game, image, 0, 1);
		this.timer = 0;
	}

	update() {
		if(this.game.time.totalElapsedSeconds() > this.timer) {
			var item = new Item(this.game,'billegreen');
			item.x = this.x;
			item.y = this.y;
			this.output[0].addItem(this.game.add.existing(item));
			this.timer = this.game.time.totalElapsedSeconds()+5;
		}
	}

} 