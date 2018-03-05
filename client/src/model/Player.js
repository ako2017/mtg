Player = function() {
	Observable.call(this);
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
	this.hasPass = false;
	this.avatar = "";
	this.game = null;
};

Player.prototype = Object.create(Observable.prototype);

Player.prototype.pass = function() {
	this.hasPass = true;
};

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

Player.prototype.degagement = function() {
	var event = {};
	event.type = GameEvent.DEGAGEMENT;
	this.notify(event);
};

Player.prototype.pioche = function() {
	var event = {};
	event.type = GameEvent.PIOCHE_CARD;
	var card = this.deck.pop();
	this.hand.push(card);
	event.data = {player:this,card:card};
	this.notify(event);
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
	var event = {};
	
	if(!this.game.isPlayerActif(this)) {
		event.type = GameEvent.ERROR;
		event.data = "vous n'etes pas le joueur actif";
		this.notify(event);
		return false;
	}
	if(this.hasPoseTerrain) {
		event.type = GameEvent.ERROR;
		event.data = "vous ne pouvez poser qu'un terrain par tour";
		this.notify(event);
		return false;
	}
	addMana(card.mana,this.mana);
	this.hasPoseTerrain = true;
	this.terrains.push(card);
	this.hand.removeByValue(card);
	event.type = GameEvent.POSE_TERRAIN;
	event.data = {player:this,card:card};
	this.notify(event);
	return true;
};

Player.prototype.poseCreatureOrEphemere= function(stack, card, isEph) {
	var event = {};
	if(!this.canPayMana(card.mana)) {
		event.type = GameEvent.ERROR;
		event.data = "vous n'avez pas assez de mana";
		this.notify(event);
		return false;
	}
	console.log("pose creature or ephemere");
	if(stack.containsType(TypeCard.CREATURE) && !isEph) {
		event.type = GameEvent.ERROR;
		event.data = "une creature est deja dans la pile";
		this.notify(event);
		return false;
	}
	this.payMana(card.mana);
	this.hand.removeByValue(card);
	stack.push(card);
	return true;
};

Player.prototype.poseCapacity= function(stack, card) {
	var event = {};
	if(!this.canPayMana(card.mana)) {
		event.type = GameEvent.ERROR;
		event.data = "vous n'avez pas assez de mana";
		this.notify(event);
		return false;
	}
	this.payMana(card.mana);
	stack.push(card);
	return false;
};

Player.prototype.poseCard = function(card,stack) {
	var event = {};
	if(card.type == TypeCard.TERRAIN) {
		return this.poseTerrain(card);
	}
	else if(card.type == TypeCard.CREATURE){
		return this.poseCreatureOrEphemere(stack, card, false);
	}
	else if(card.type == TypeCard.EPHEMERE){
		return this.poseCreatureOrEphemere(stack, card, true);
	}
	else if(card.type == TypeCard.CAPACITY){
		return this.poseCapacity(stack, card);
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

Player.prototype.muligane = function() {
	var event = {};
	var nbCard = this.hand.length-1;
	
	if(nbCard == 0) {
		event.type = GameEvent.ERROR;
		event.data = "vous ne pouvez plus faire de muligane";
		this.notify(event);
		return;
	}
	
	for(var i=0;i<this.hand.length;i++) {
		this.deck.push(this.hand[i]);
	}
	this.hand = [];
	for(var i=0;i<nbCard;i++) {
		this.hand.push(this.deck.pop());
	}
	event.type = GameEvent.MULIGANE;
	event.data = {player:this};
	this.notify(event);
};