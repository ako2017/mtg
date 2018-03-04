CardView = function(game, card) {
	Phaser.Sprite.call(this, game);
	card.view = this;
	this.back = null;
	this.front = null;
	this.isSelected = false;
	this.cardModel = card;
	this.init(card);
	this.inputEnabled = true;
	this.events.onInputUp.add(this.onClick, this);
};

CardView.prototype = Object.create(Phaser.Sprite.prototype);
CardView.prototype.constructor = CardView;

CardView.prototype.init = function(card) {
	this.back = this.game.make.sprite(0, 0, 'back');
	this.front = this.game.make.sprite(10, 25, card.frontPic);
	this.initLabels(card);
	this.show(false);
	this.model = card;
	this.scale.set(0.5, 0.5);
};

CardView.prototype.show = function(isVisible) {
	this.front.visible = isVisible;
	this.back.visible = !isVisible;
};

CardView.prototype.initLabels = function(card) {
	this.addChild(this.back);
	this.addChild(this.front);
};

CardView.prototype.select = function() {
	this.isSelected = !this.isSelected;
};

CardView.prototype.unselectAllWithout = function(card) {
	for (i = 0; i < this.owner.hand.length; i++) {
		if (this.owner.hand[i].isSelected && this.owner.hand[i] != card) {
			this.owner.hand[i].select();
		}
	}
};

CardView.prototype.onClick = function() {
	this.select();
	if(!this.isSelected) {
		GUI.hideActionCard();
	}
	else {
		GUI.showActionCard(this);		
	}

};

/**
 * Automatically called by World.update
 */

CardView.prototype.update = function() {
};

CardView.prototype.enterBattlefieldAnim = function(card) {
};

CardView.prototype.onReceive = function(event) {
	switch(event.type) {
		case GameEvent.ENTER_BATTLEFIELD:
			this.enterBattlefieldAnim();
			break;
		case GameEvent.ERROR:
			alert(event.data);
			break;
	}
};