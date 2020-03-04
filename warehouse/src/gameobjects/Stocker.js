/**
 * Repésente un extracteur
 */
class Stocker extends Machine {

	constructor(game, image) {
		super(game, image);
		this.counter = this.addChild(this.game.add.text(0, 0, '0', { font: '28px Arial Black',fill: '#fff',strokeThickness: 4 }));
		this.counter.anchor.set(0.5,0.5);
		this.cpt = 0;

		this.addInputNode(-20,0,1,0);
		this.addOutputNode(20,0,1,1);
	}

	update() {
		super.update();
		this.counter.setText(this.outputs[0].getNbItem());
		var _this = this
		this.inputs[0].items.forEach(function(item) {
			_this.outputs[0].addItem(item);
			item.kill();
		});
		this.inputs[0].items.length = 0;
	}

} 