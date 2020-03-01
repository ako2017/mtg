/**
 * Repésente une mine
 */
class Mine extends Machine {

	constructor(game, image) {
		super(game, image);
		this.counter = this.addChild(this.game.add.text(0, 0, '0', { font: '28px Arial Black',fill: '#fff',strokeThickness: 4 }));
		this.counter.anchor.set(0.5,0.5);
		this.cpt = 200;
		this.addOutputNode(20,0,image,1);
	}

	getItem() {
		this.cpt--;
		this.counter.setText(this.cpt);
		var item =  new Item(this.game,'billegreen');
		item.x = this.x;
		item.y = this.y;
		return item;
	}

} 