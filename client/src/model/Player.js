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
	sendEvent(GameEvent.PIOCHE_CARD,{player:this,card:card},this);
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

Player.prototype.poseTerrain = function(card) {
	if(!this.game.isPlayerActif(this)) {
		sendEvent(GameEvent.ERROR,"vous n'etes pas le joueur actif",this);
		return false;
	}
	if(this.hasPoseTerrain) {
		sendEvent(GameEvent.ERROR,"vous ne pouvez poser qu'un terrain par tour",this);
		return false;
	}
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

Player.prototype.engage = function(card) {
	if(this.game.isPlayerActif(this) && card.type == TypeCard.TERRAIN) {
		card.engage();
		addMana(card.mana,this.mana);
		sendEvent(GameEvent.UPDATE_MANA,this,this);
	}
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
	if(bloqueur.canBloque(attaquant)) {
		attaquant.blockedBy = bloqueur;
		bloqueur.blockCard = attaquant;
		sendEvent(GameEvent.DECLARE_BLOQUEUR,attaquant,this);
		return true;
	}
	return false;
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

Player.prototype.valid = function() {
		if (this.game.pm.valid(this)) {
		if (!this.game.stack.isEmpty()) {
			this.game.unPassAll();
			this.game.stack.resolve(this.game);
		} else {
			this.game.unPassAll();
			this.game.pm.next();
		}
	}
};