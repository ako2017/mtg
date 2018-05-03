NettoyagePhase = function(pm) {
	this.pm = pm;
	this.phaseId = PHASE.NETTOYAGE;
};

NettoyagePhase.prototype.execute = function() {
	this.pm.game.getPlayerActif().battlefield.forEach(function(card, index) {
		card.malInvocation = false;
	});
	this.pm.game.getPlayerActif().hasPoseTerrain = false;
	this.pm.game.getPlayerActif().terrains.forEach(function(card, index) {
		addMana(card.mana,this.pm.game.getPlayerActif().mana);
	},this);
	
	if (this.pm.game.getPlayerWithToken().hand.length > 7) {
		var event = {};
		event.type = GameEvent.RETIRER_CARD;
		this.pm.notify(event);
		return PHASE.WAIT;
	} else {
		setTimeout(this.next.bind(this), Duration.NETTOYAGE);
		return PHASE.WAIT;
	}
};

NettoyagePhase.prototype.valid = function(player) {
	if(this.pm.game.isPlayerActif(player) && player.hand.length <=7) {
		this.pm._next = PHASE.DEGAGEMENT;
		return true;
	}
	return false;
};

NettoyagePhase.prototype.next = function() {
	this.pm._next = PHASE.DEGAGEMENT;
	this.pm.next();
};

NettoyagePhase.prototype.end = function() {
	this.pm.phases[PHASE.PRINCIPALE].phaseNum = 0;
};