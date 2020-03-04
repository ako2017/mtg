/**
 * Repésente une mine
 */
class Mine extends Machine {

	constructor(game, image) {
		super(game, image);
		this.counter = this.addChild(this.game.add.text(0, 0, '0', { font: '28px Arial Black',fill: '#fff',strokeThickness: 4 }));
		this.counter.anchor.set(0.5,0.5);
		this.addOutputNode(20,0,1,1).itemCounter = 200;
	}

	update() {
	//	super.update();
		this.counter.setText(this.outputs[0].getNbItem());
	}

} 