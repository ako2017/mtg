/**
 * Repésente l'aspect visuel d'une carte
 */
class CardView extends Phaser.Sprite {

	constructor(game, cardData) {
		super(game);
		this.isSelected = false;
		this.init(cardData);
	}

	
	init(cardData) {
		this.back = this.addChild(this.game.make.sprite(0, 0, 'back'));
		this.front = this.addChild(this.game.make.sprite(0, 0, cardData.frontPic));
		this.front.anchor.setTo(0.5);
		this.back.anchor.setTo(0.5);
		this.show(false);
		this.scale.set(0.5, 0.5);
	}

	show(isVisible) {
		this.front.visible = isVisible;
		this.back.visible = !isVisible;
	}
} 