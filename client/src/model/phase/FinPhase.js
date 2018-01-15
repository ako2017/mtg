FinPhase = function(pm) {
	this.pm = pm;
};

FinPhase.prototype.execute = function() {
	setTimeout(this.next.bind(this), Duration.FIN);
	return PHASE.WAIT;
};

FinPhase.prototype.valid = function(player) {
	return false;
};

FinPhase.prototype.next = function() {
	this.pm._next = PHASE.NETTOYAGE;
	this.pm.next();
};

FinPhase.prototype.end = function() {
};