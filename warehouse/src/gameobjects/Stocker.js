/**
 * Repésente un extracteur
 */
class Stocker extends Machine {

	constructor(game, image) {
		super(game, image);
		this.counter = this.addChild(this.game.add.text(0, 0, '0', { font: '28px Arial Black',fill: '#fff',strokeThickness: 4 }));
		this.counter.anchor.set(0.5,0.5);
		this.cpt = 0;

		this.addInputNode(-20,0,image,1);
		this.addOutputNode(20,0,image,1);
	}

	update() {
		this.cpt+=this.inputs[0].items.length;
		this.counter.setText(this.cpt);
		this.inputs[0].items.forEach(function(item) {
			item.kill();
		});
		this.inputs[0].items.length = 0;
	}

	addItem(item) {
		super.addItem(item);
		item.kill();
		this.counter.setText(this.items.length);
	}

} 