CardView = function(game, card) {
	Phaser.Sprite.call(this, game);
	card.view = this;
	this.isSelected = false;
	this.cardModel = card;
	this.init(card);
};

CardView.prototype = Object.create(Phaser.Sprite.prototype);
CardView.prototype.constructor = CardView;

CardView.prototype.init = function(card) {
	this.back = this.addChild(this.game.make.sprite(0, 0, 'back'));
	this.front = this.addChild(this.game.make.sprite(0, 0, card.frontPic));
	this.front.anchor.setTo(0.5);
	this.back.anchor.setTo(0.5);
	this.show(false);
	this.model = card;
	this.scale.set(0.5, 0.5);
};

CardView.prototype.show = function(isVisible) {
	this.front.visible = isVisible;
	this.back.visible = !isVisible;
};

CardView.prototype.unselectAllWithout = function(cardView) {
	for (i = 0; i < this.ownerView.hand.length; i++) {
		if (this.ownerView.hand[i].isSelected && this.ownerView.hand[i] != cardView) {
			this.ownerView.hand[i].select();
		}
	}
};

CardView.prototype.onClick = function(cardView) {
	cardView.unselectAllWithout(cardView);
	cardView.isSelected = !cardView.isSelected;
	if(!cardView.isSelected) {
		this.hideActionCard(cardView);
	}
	else {
		this.showActionCard(cardView);
	}
};