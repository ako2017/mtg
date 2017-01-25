Player = function() {
	this.hand = [];
	this.battlefield = [];
	this.terrains = [];
	this.deck = [];
	this.cemeteryes = [];
	this.exil = [];
	this.life = 22;
	this.mana=[0,0,0,0,0,0];
	//this.socket;
	this.name = "";
	this.doneDistrib = false;
	this.hasPoseTerrain = false;
	this.canPioche = true;
};

Player.prototype = new Observable();

Player.prototype.canPayMana = function(mana) {
	for(var i=0;i<ManaSize;i++) {
		if(this.mana[i] < mana[i])
			return false;
	}
	return true;
};

Player.prototype.payMana = function(mana) {
	for(var i=0;i<ManaSize;i++) {
		this.mana[i] = this.mana[i] - mana[i];
	}
};

Player.prototype.pioche = function(board) {
	var event = {};
	event.type = GameEvent.PIOCHE_CARD;
	var card = this.deck.pop();
	this.hand.push(card);
	event.data = {player:player,card:card};
	this.notify(event);
	setTimeout(board.nextPhase.bind(board), 2000);
};

Player.prototype.getCardById = function(cardId) {
	for(var i=0;i<this.hand.length;i++) {
		if(this.hand[i].id == cardId) {
			return this.hand[i]
		}
	}
	return null;
};

Player.prototype.poseTerrain = function(card) {
	this.hasPoseTerrain = true;
	this.terrains.push(card);
	this.hand.removeByValue(card);
};

Player.prototype.poseCreature= function(board, card) {
	board.stack.push(card);
	this.hand.removeByValue(card);	
};

module.exports = Player;