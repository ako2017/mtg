//  Here is a custom game object
PlayerView = function(game) {
	this.game = game;
	this.hand = [];
	this.battlefield = [];
	this.deck = [];
	this.cemetery = [];
	this.exil = [];
	this.life = 20;
	this.mana = [ 0, 0, 0, 0, 0, 0 ];
	this.name = "";
	this.model = null;
	this.isMe = false;
	this.posDeck = {x:0, y:0};
};

PlayerView.prototype.hasSelectedCards = function() {
	for (var i = 0; i < this.hand.length; i++) {
		if (this.hand[i].isSelected)
			return true;
	}
	return false;
};

PlayerView.prototype.poseCardsAnim = function(player, card) {
	var cardView = card.observers[0];
	cardView.select();
	if (player.name == "pau") {
		if (card.typeC == TypeCard.TERRAIN) {
			this.game.add.tween(cardView).to({
				y : 300
			}, 1000, Phaser.Easing.Linear.None, true);
		}
		if (card.typeC != TypeCard.TERRAIN) {
			this.game.add.tween(cardView).to({
				y : 270
			}, 1000, Phaser.Easing.Linear.None, true);
		}
	} else {
		if (player.typeC == TypeCard.TERRAIN)
			this.game.add.tween(cardView).to({
				y : 150
			}, 1000, Phaser.Easing.Linear.None, true);
		if (player.typeC != TypeCard.TERRAIN)
			this.game.add.tween(cardView).to({
				y : 200
			}, 1000, Phaser.Easing.Linear.None, true);
	}
	cardView.show(true);
	this.hand.removeByValue(cardView);
};

PlayerView.prototype.piocheCardAnim = function(card) {
	var cardView = card.observers[0];
	this.game.add.tween(cardView).to({
		x : 150
	}, 2000, Phaser.Easing.Linear.None, true);
	cardView.show(true);
	this.deck.pop();
};

PlayerView.prototype.unselectAllWithout = function(card) {
	for (i = 0; i < this.owner.hand.length; i++) {
		if (this.owner.hand[i].isSelected && this.owner.hand[i] != card) {
			this.owner.hand[i].select();
		}
	}
};

PlayerView.prototype.muliganeAnim = function(player, cards) {
	for(var i=0;i<this.hand.length;i++) {
		this.game.add.tween(this.hand[i]).to({x: this.posDeck.x, y:this.posDeck.y},1000,Phaser.Easing.Linear.None,true);
		this.hand[i].show(false);
	}
	this.hand = [];
	for(var i=0;i<cards.length;i++) {
		this.hand.push(cards[i].observers[0]);
	}
	
	setTimeout(function(cards,name){
		var y = this.isMe?430:0;
		for(var i=0;i<cards.length;i++) {
			this.game.add.tween(cards[i].observers[0]).to({x: 100 + i*80, y:y},1000,Phaser.Easing.Linear.None,true);
			if(this.isMe) {
				cards[i].observers[0].show(true);
			}
		}
		}.bind(this,cards,player.name), 2000);
};

PlayerView.prototype.onReceive = function(event) {
	switch (event.type) {
	case GameEvent.MULIGANE:
		this.muliganeAnim(event.data.player, event.data.cards);
		break;
	case GameEvent.POSE_CARD:
		this.poseCardsAnim(event.data.player, event.data.card);
		break;
	case GameEvent.PIOCHE_CARD:
		this.piocheCardAnim(event.data.card);
		break;
	case GameEvent.ERROR:
		alert(event.data);
		break;
	}
};