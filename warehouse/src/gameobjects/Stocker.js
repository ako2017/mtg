/**
 * Repésente un extracteur
 */
class Stocker extends Node {

	constructor(game, image) {
		super(game, image, 1, 1);
		this.counter = this.addChild(this.game.add.text(0, 0, '0', { font: '28px Arial Black',fill: '#fff',strokeThickness: 4 }));
		this.counter.anchor.set(0.5,0.5);
	}

	update() {

	}

	addItem(item) {
		super.addItem(item);
		item.kill();
		this.counter.setText(this.items.length);
	}

} 