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
		this.maxItem = 3;
		this.inputEnabled  = true;
		this.events.onInputDown.add(this.game.linkHandler.onClick, this.game.linkHandler);
		this.events.onInputUp.add(this.game.linkHandler.onUp, this.game.linkHandler);
		this.events.onInputOver.add(this.game.linkHandler.onOver, this.game.linkHandler);
	}

	addLink(link) {
		this.link = link;
	}

	isFull() {
		return this.items.length >= this.maxItem;
	}

	update() {
		if(!this.isInput && this.link != null && this.items.length > 0 && !this.link.isFull()) {
			this.link.addItem(this.popItem());
		}
	}

	popItem() {
		return this.items.pop();
	}

	addItem(item) {
		this.items.push(item);
	}

} 