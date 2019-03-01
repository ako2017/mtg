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
		sendEvent(GameEvent.RETIRER_CARD,null,this.pm.game);
		return PHASE.WAIT;
	} else {
		return PHASE.DEGAGEMENT;
	}
};

NettoyagePhase.prototype.valid = function(player) {
	if(this.pm.game.isPlayerActif(player) && player.hand.length <=7) {
		return PHASE.DEGAGEMENT;
	}
	return PHASE.WAIT;
};

NettoyagePhase.prototype.end = function() {
	this.pm.phases[PHASE.PRINCIPALE].phaseNum = 0;
};