NettoyagePhase = function(pm) {
	this.pm = pm;
};

NettoyagePhase.prototype.execute = function() {
	if (this.pm.game.getPlayerWithToken().hand.length > 7) {
		var event = {};
		event.type = GameEvent.RETIRER_CARD;
		this.notify(event);
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
};