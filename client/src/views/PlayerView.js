//  Here is a custom game object
PlayerView = function (game, board, controller, name) {
	this.game = game;
	this.hand = [];
	this.battlefield = [];
	this.deck = [];
	this.cemetery = [];
	this.exil = [];
	this.life = 20;
	this.mana=[0,0,0,0,0,0];
	this.name = "";
	this.model = null;
};

PlayerView.prototype.hasSelectedCards = function() {
	for(var i=0;i<this.hand.length;i++) {
		if(this.hand[i].isSelected) 
			return true;
	}
	return false;
};

PlayerView.prototype.poseCardsAnim = function(player, card) {
	var cardView = card.observers[0];
	cardView.select();
	if(player.name == "pau") {
		if(card.typeC == TypeCard.TERRAIN) {
			this.game.add.tween(cardView).to({y: 300},2000,Phaser.Easing.Linear.None,true);
		}
		if(card.typeC != TypeCard.TERRAIN) {
			this.game.add.tween(cardView).to({y: 270},2000,Phaser.Easing.Linear.None,true);
		}
	}
	else {
		if(player.typeC == TypeCard.TERRAIN) 
			this.game.add.tween(cardView).to({y: 150},2000,Phaser.Easing.Linear.None,true);
		if(player.typeC != TypeCard.TERRAIN) 
			this.game.add.tween(cardView).to({y: 200},2000,Phaser.Easing.Linear.None,true);
	}
	cardView.show(true);
	this.hand.removeByValue(cardView);
};

PlayerView.prototype.piocheCardAnim = function(card) {
	var cardView = card.observers[0];
	this.game.add.tween(cardView).to({x: 150},2000,Phaser.Easing.Linear.None,true);
	cardView.show(true);
	this.deck.pop();
};

PlayerView.prototype.onReceive = function(event) {
	switch(event.type) {
		case GameEvent.POSE_CARD:
			this.poseCardsAnim(event.data.player, event.data.card);
			break;
		case GameEvent.PIOCHE_CARD:
			this.piocheCardAnim(event.data.player, event.data.card);
			break;
		case GameEvent.ERROR:
			alert(event.data);
			break;
	}
};