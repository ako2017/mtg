CardView = function(game, card, board, boardView,ownerView) {
	Phaser.Sprite.call(this, game);
	this.back = null;
	this.front = null;
	this.isSelected = false;
	this.boardModel = board;
	this.boardView = boardView;
	this.ownerView = ownerView;
	this.cardModel = card;
	this.init(card);
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
	if (this.isSelected) {
		this.ownerView.unselectAllWithout(this);
		this.y -= 70;
		this.scale.set(0.7, 0.7);
	} else {
		this.y += 70;
		this.scale.set(0.5, 0.5);
	}
};

CardView.prototype.onClick = function() {
	if (this.boardModel.etape == Etape.DECLARATION_ATTAQUANTS) {
		//this.cardModel.owner.declareAttaquant(this);
	} else if (this.boardModel.etape == Etape.DECLARATION_BLOQUEURS) {
		//this.cardModel.owner.declareBloqueur(this);
		//	this.select();	
	} else if (this.boardModel.phase == Phase.PRINCIPALE) {
		this.select();
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