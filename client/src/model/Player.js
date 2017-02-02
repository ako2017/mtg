Player = function() {
	this.hand = [];
	this.battlefield = [];
	this.terrains = [];
	this.deck = [];
	this.cemeteryes = [];
	this.exil = [];
	this.life = 22;
	this.mana=[0,0,0,0,0,0];
	this.name = "";
	this.doneDistrib = false;
	this.hasPoseTerrain = false;
	this.canPioche = true;
	this.attaquants = [];
};

Player.prototype = new Observable();

Player.prototype.canPayMana = function(mana) {
	for(var i=0;i<mana.length;i++) {
		if(this.mana[i] < mana[i])
			return false;
	}
	return true;
};

Player.prototype.payMana = function(mana) {
	for(var i=0;i<mana.length;i++) {
		this.mana[i] = this.mana[i] - mana[i];
	}
};

Player.prototype.pioche = function(board) {
	var event = {};
	event.type = GameEvent.PIOCHE_CARD;
	var card = this.deck.pop();
	this.hand.push(card);
	event.data = {player:this,card:card};
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
	console.log("pose terrain");
	if(this.hasPoseTerrain) {
		event.type = GameEvent.ERROR;
		event.data = "vous ne pouvez poser qu'un terrain par tour";
		this.notify(event);
		return;
	}
	this.hasPoseTerrain = true;
	this.terrains.push(card);
	this.hand.removeByValue(card);
	event.type = GameEvent.POSE_CARD;
	event.data = {player:this,card:card};
	this.notify(event);
};

Player.prototype.poseCreatureOrEphemere= function(board, card, isEph) {
	var event = {};
	if(!this.canPayMana(card.mana)) {
		event.type = GameEvent.ERROR;
		event.data = "vous n'avez pas assez de mana";
		this.notify(event);
		return;
	}
	this.payMana(card.mana);
	console.log("pose creature or ephemere");
	if(board.containsTypeInStack(TypeCard.CREATURE) && !isEph) {
		event.type = GameEvent.ERROR;
		event.data = "une creature est deja dans la pile";
		this.notify(event);
		return;
	}
	board.stack.push(card);
	this.hand.removeByValue(card);	
	event.type = GameEvent.STACK_CARD;
	event.data = {player:this,card:card};
	this.notify(event);
	board.letPlayerDoSth();
};

Player.prototype.poseCard = function(board, card) {
	console.log("pose carte");
	var event = {};
	if(!board.isPlayerActif(this)) {
		event.type = GameEvent.ERROR;
		event.data = "vous n'avez pas la main";
		this.notify(event);
	}
	else if(card.typeC == TypeCard.TERRAIN && !player.hasPoseTerrain) {
		this.poseTerrain(card);
	}
	else if(card.typeC == TypeCard.CREATURE){
		this.poseCreatureOrEphemere(board, card, false);
	}
	else if(card.typeC == TypeCard.EPHEMERE){
		this.poseCreatureOrEphemere(board, card, true);
	}
};

Player.prototype.declareAttaquant = function(card) {
	if(card.isEngaged()) {
		var event = {};
		event.type = GameEvent.ERROR;
		event.data = "carte déja engagée";
		this.notify(event);
	}
	else {
		card.engage();
		this.attaquants.push(card);
		var event = {};
		event.type = GameEvent.DECLARE_ATTAQUANT;
		event.data = card;
		this.notify(event);
	}
};

Player.prototype.undeclareAttaquant = function(card) {
	if(card.isEngaged()) {
		this.attaquants.removeByValue(card);
		card.degage();
		var event = {};
		event.type = GameEvent.UNDECLARE_ATTAQUANT;
		event.data = card;
		this.notify(event);
	}
};

Player.prototype.declareBloqueur = function(bloqueur, attaquant) {
	attaquant.blockedBy = bloqueur;
	bloqueur.blockCard = attaquant;
	var event = {};
	event.type = GameEvent.DECLARE_BLOQUEUR;
	event.data = attaquant;
	this.notify(event);
};

Player.prototype.undeclareBloqueur = function(bloqueur) {
	bloqueur.blockCard.blockedBy = null;
	bloqueur.blockCard = null;
	var event = {};
	event.type = GameEvent.UNDECLARE_BLOQUEUR;
	event.data = attaquant;
	this.notify(event);
};

module.exports = Player;