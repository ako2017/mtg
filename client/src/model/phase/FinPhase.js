FinPhase = function(pm) {
	this.pm = pm;
	this.phaseId = PHASE.FIN;
};

FinPhase.prototype.execute = function() {
	return PHASE.NETTOYAGE;
};

FinPhase.prototype.valid = function(player) {
	return false;
};

FinPhase.prototype.next = function() {
	this.pm._next = PHASE.NETTOYAGE;
	this.pm.game.nextToken();
	this.pm.game.nextPlayer();
	this.pm.next();
};

FinPhase.prototype.end = function() {
};