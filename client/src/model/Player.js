Player = function() {
	Observable.call(this);
	this.hand = [];
	this.battlefield = [];
	this.terrains = [];
	this.deck = [];
	this.cemetery = [];
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
	this.battlefield.forEach(function(card, index) {
		card.degage();
	});
	
	this.terrains.forEach(function(card, index) {
		card.degage();
	});
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
	if(!this.game.isPlayerActif(this)) {
		sendEvent(GameEvent.ERROR,"vous n'etes pas le joueur actif",this);
		return false;
	}
	if(this.hasPoseTerrain) {
		sendEvent(GameEvent.ERROR,"vous ne pouvez poser qu'un terrain par tour",this);
		return false;
	}
	addMana(card.mana,this.mana);
	this.hasPoseTerrain = true;
	this.terrains.push(card);
	this.hand.removeByValue(card);
	sendEvent(GameEvent.POSE_TERRAIN,{player:this,card:card},this);
	return true;
};

Player.prototype.poseCapacity= function(stack, card) {
	if(!this.canPayMana(card.mana)) {
		sendEvent(GameEvent.ERROR,"vous n'avez pas assez de mana",this);
		return false;
	}
	this.payMana(card.mana);
	stack.push(card);
	return false;
};

Player.prototype.retirerCard= function(card) {
	if (!this.game.isPlayerWithToken(this)) {
		sendEvent(GameEvent.ERROR,"vous n'avez pas la main",this);
		return;
	}
	
	if(this.hand.length > 7) {
		this.hand.removeByValue(card);
		card.gotoCemetery();	
	}
	else {
		sendEvent(GameEvent.ERROR,"nombre de carte atteint",this);
	}	
};

Player.prototype.poseCard = function(card,stack) {
	if(card.type == TypeCard.TERRAIN) {
		return this.poseTerrain(card);
	}
	if(!this.canPayMana(card.mana)) {
		sendEvent(GameEvent.ERROR,"vous n'avez pas assez de mana",this);
		return false;
	}

	else if(card.type == TypeCard.EPHEMERE){
		this.payMana(card.mana);
		this.hand.removeByValue(card);
		stack.push(card);
		return true;
	}
	else if(card.type == TypeCard.CAPACITY){
		return this.poseCapacity(stack, card);
	}
	else if(card.type == TypeCard.CREATURE || card.type == TypeCard.RITUEL || card.type == TypeCard.ENCHANTEMENT || card.type == TypeCard.ARTEFACT){
		if(!this.game.pm.isPhase(PHASE.PRINCIPALE) || !this.game.isPlayerActif(this)) {
			sendEvent(GameEvent.ERROR,"carte jouable en phase principale par le joueur actif",this);
			return false;
		}
		if(stack.containsType(card.type)) {
			sendEvent(GameEvent.ERROR,"une carte de ce type est deja dans la pile",this);
			return false;
		}
		this.payMana(card.mana);
		this.hand.removeByValue(card);
		stack.push(card);
		return true;
	}
};

Player.prototype.declareAttaquant = function(card) {
	if(!this.game.pm.isPhase(PHASE.DECLARATION_ATTAQUANT) || !this.game.isPlayerActif(this)) {
		sendEvent(GameEvent.ERROR,"vous ne pouvez pas faire cette action",this);
		return;
	}
	
	if(card.canAttaque()) {
		card.engage();
		this.attaquants.push(card);
		var event = {};
		event.type = GameEvent.DECLARE_ATTAQUANT;
		event.data = card;
		this.notify(event);
	}
};

Player.prototype.declareBloqueur = function(bloqueur, attaquant) {
	if(!this.game.pm.isPhase(PHASE.DECLARATION_BLOQUEUR)) {
		sendEvent(GameEvent.ERROR,"vous ne pouvez pas faire cette action",this);
		return;
	}
	
	if(bloqueur.canBloque(attaquant)) {
		attaquant.blockedBy = bloqueur;
		bloqueur.blockCard = attaquant;
		var event = {};
		event.type = GameEvent.DECLARE_BLOQUEUR;
		event.data = attaquant;
		this.notify(event);
	}
};

Player.prototype.muligane = function() {
	if(!this.game.pm.isPhase(PHASE.DISTRIBUTION)) {
		sendEvent(GameEvent.ERROR,"vous ne pouvez pas faire de muligane",this);
		return;
	}
	
	var nbCard = this.hand.length-1;
	
	if(nbCard == 0) {
		sendEvent(GameEvent.ERROR,"vous ne pouvez plus faire de muligane",this);
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