NettoyagePhase = function(pm) {
	this.pm = pm;
	this.phaseId = PHASE.NETTOYAGE;
};

NettoyagePhase.prototype.execute = function() {	
	this.pm.game.getPlayerActif().newTurn();
	
	this.pm.game.getPlayerNonActif().battlefield.forEach(function(card, index) {
		card.restaure();
	},this);
	
	if (this.pm.game.getPlayerWithToken().hand.length > 7) {
		sendEvent(GameEvent.RETIRER_CARD,null,this.pm);
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