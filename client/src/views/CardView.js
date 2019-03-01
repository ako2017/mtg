CardView = function(game, cardData) {
	Phaser.Sprite.call(this, game);
	this.isSelected = false;
	this.init(cardData);
};

CardView.prototype = Object.create(Phaser.Sprite.prototype);
CardView.prototype.constructor = CardView;

CardView.prototype.init = function(cardData) {
	this.back = this.addChild(this.game.make.sprite(0, 0, 'back'));
	this.front = this.addChild(this.game.make.sprite(0, 0, cardData.frontPic));
	this.front.anchor.setTo(0.5);
	this.back.anchor.setTo(0.5);
	this.show(false);
	this.scale.set(0.5, 0.5);
};

CardView.prototype.show = function(isVisible) {
	this.front.visible = isVisible;
	this.back.visible = !isVisible;
};

CardView.prototype.unselectAllWithout = function(cardView) {
	for (i = 0; i < this.ownerView.hand.length; i++) {
		if (this.ownerView.hand[i]!=null && this.ownerView.hand[i].isSelected && this.ownerView.hand[i] != cardView) {
			this.ownerView.hand[i].isSelected = false;
		}
	}
};

CardView.prototype.onClick = function(cardView) {
	cardView.unselectAllWithout(cardView);
	cardView.isSelected = !cardView.isSelected;
	if(!cardView.isSelected) {
		this.hideActionCard();
	}
	else {
		this.showActionCard(cardView);
	}
};

CardView.prototype.onOver = function(cardView) {
	this.scale.setTo(0.8, 0.8);
};

CardView.prototype.onOut = function(cardView) {
	this.scale.setTo(0.5, 0.5)
};