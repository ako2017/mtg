/**
 * Repésente un noeud
 */
class Node extends Phaser.Sprite {

	constructor(game, image, isInput, type) {
		super(game,0,0,'output');
		this.anchor.set(0.5,0.5);
		this.isInput = isInput;
		this.type = type;
		this.link = null;
		this.items = [];
		this.inputEnabled  = true;
		this.events.onInputDown.add(this.game.linkHandler.onClick, this.game.linkHandler);
		this.events.onInputUp.add(this.game.linkHandler.onUp, this.game.linkHandler);
		this.events.onInputOver.add(this.game.linkHandler.onOver, this.game.linkHandler);
		//this.name = this.addChild(this.game.add.text(0, this.height/2, this.constructor.name.toLowerCase(), { font: '12px Arial Black',fill: '#fff',strokeThickness: 4 }));
		//this.name.anchor.set(0.5,0.5);
	}

	addLink(link) {
		this.link = link;
	}

	addItem(item) {
		this.items.push(item);
	}

} 