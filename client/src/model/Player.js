Player = function() {
	Observable.call(this);
	this.hand = [];
	this.battlefield = [];
	this.terrains = [];
	this.deck = [];
	this.cemetery = [];
	this.exil = [];
	this.life = 3;
	this.mana=[0,0,0,0,0,0];
	this.name = "";
	this.doneDistrib = false;
	this.hasPoseTerrain = false;
	this.canPioche = true;
	this.attaquants = [];
	this.hasPass = false;
	this.avatar = "";
	this.game = null;
	this.uid = UID++;
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
	sendEvent(GameEvent.UPDATE_MANA,this,this);
};

Player.prototype.degagement = function() {
	var doDegagement = false;
	this.battlefield.forEach(function(card, index) {
		if(card.degage()) doDegagement = true;
	});
	
	this.terrains.forEach(function(card, index) {
		if(card.degage()) doDegagement = true;
	});
	return doDegagement;
};

Player.prototype.pioche = function() {
	var card = this.deck.pop();
	this.hand.push(card);
	sendEvent(GameEvent.PIOCHE_CARD,{player:this,card:card},this.game);
};

Player.prototype.getCardById = function(cardId) {
	for(var i=0;i<this.hand.length;i++) {
		if(this.hand[i].id == cardId) {
			return this.hand[i]
		}
	}
	return null;
};

Player.prototype.damage = function(value) {
	this.life += value;
	sendEvent(GameEvent.PLAYER_LIFE,this,this);
};

Player.prototype.retirerCard= function(card) {
	this.hand.removeByValue(card);
	card.gotoCemetery();
};

Player.prototype.poseCard = function(card,stack) {
	if(card.type == TypeCard.TERRAIN) {
		this.hasPoseTerrain = true;
		this.terrains.push(card);
		this.hand.removeByValue(card);
		sendEvent(GameEvent.POSE_TERRAIN,{player:this,card:card},this);
	}
	else if(card.type == TypeCard.CAPACITY){
		stack.push(card);
	}
	else {
		this.hand.removeByValue(card);
		stack.push(card);
	}
};

Player.prototype.canDeclareAttaquant = function(player,card) {
	if(!this.game.pm.isPhase(PHASE.DECLARATION_ATTAQUANT) || !this.game.isPlayerActif(this)) {
		return this.error("vous ne pouvez pas faire cette action");
	}
	if(card.canAttaque()) {
		return this.error("vous ne pouvez pas attaquer avec cette carte");
	}
	return true;
};

Player.prototype.declareAttaquant = function(card) {
	if(!this.canDeclareAttaquant(this,this.game,card,stack)) {
		return false;
	}
	card.engage();
	this.attaquants.push(card);
	var event = {};
	event.type = GameEvent.DECLARE_ATTAQUANT;
	event.data = card;
	this.notify(event);
};

Player.prototype.engage = function(card) {	
	card.engage();
	addMana(card.mana,this.mana);
	sendEvent(GameEvent.UPDATE_MANA,this,this.game);
};

Player.prototype.newTurn = function() {
	this.attaquants.length=0;
	this.hasPoseTerrain = false;
	this.battlefield.forEach(function(card, index) {
		card.malInvocation = false;
		card.restaure();
	});
	//on remet le compteur à 0
	for(var i=0;i<this.mana.length;i++)
		this.mana[i] = 0;
	sendEvent(GameEvent.RESTAURE_MAL_INVOCATION,this.battlefield,this);
};

Player.prototype.declareBloqueur = function(bloqueur, attaquant) {
	attaquant.blockedBy = bloqueur;
	bloqueur.blockCard = attaquant;
	sendEvent(GameEvent.DECLARE_BLOQUEUR,attaquant,this);
};

Player.prototype.muligane = function() {
	var nbCard = this.hand.length-1;
	if(nbCard<=0) return false;
	for(var i=0;i<this.hand.length;i++) {
		this.deck.push(this.hand[i]);
	}
	this.hand = [];
	for(var i=0;i<nbCard;i++) {
		this.hand.push(this.deck.pop());
	}
	sendEvent(GameEvent.MULIGANE,this,this.game);
	return true;
};