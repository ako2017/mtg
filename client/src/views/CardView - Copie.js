CardView = function (game, card, board, boardView) {
	Phaser.Sprite.call(this, game);
	
	this.style = null;
	this.nom = null;
	this.forceEndurance= null;
	this.type = null;
	this.text = null;
	this.back = null;
	this.front = null;
	this.isSelected = false;
	this.boardModel = board;
	this.boardView = boardView;
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
	this.scale.set(0.5 , 0.5);
};

CardView.prototype.show = function(isVisible) {
	this.front.visible = isVisible;
	this.back.visible = !isVisible;
	this.nom.visible = isVisible;
	this.forceEndurance.visible = isVisible;
	this.type.visible = isVisible;
	this.text.visible = isVisible;
};

CardView.prototype.initLabels = function(card) {
	this.style = { font: "10px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
	this.forceEndurance= this.game.add.text(120, 185, card.force + "/" + card.endurance, this.style);
	this.nom = this.game.add.text(13, 10, card.nom, this.style);
	this.type= this.game.add.text(13, 115,card.type,this.style);
	this.style = { font: "6px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
	this.text= this.game.add.text(13, 130,card.text, this.style);
	this.text.lineSpacing = -6;
	
	this.addChild(this.back);
	this.addChild(this.front);
	this.addChild(this.nom);
	this.addChild(this.forceEndurance);
	this.addChild(this.type);
	this.addChild(this.text);
};

CardView.prototype.select = function() {
	this.isSelected = !this.isSelected;
	if(this.boardModel.phase == Phase.PRINCIPALE || this.boardModel.sousEtape == SousEtape.RETIRER_CARD) {
		if(this.isSelected) {
			this.scale.set(0.7 , 0.7);
		}
		else {
			this.scale.set(0.5 , 0.5);
		}
	}
};

CardView.prototype.onClick = function() {
	this.select();
};

/**
 * Automatically called by World.update
 */
 
CardView.prototype.update = function() {
};

CardView.prototype.onReceive = function(event) {
};
