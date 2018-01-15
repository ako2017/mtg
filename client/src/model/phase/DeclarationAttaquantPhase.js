DeclarationAttaquantPhase = function(pm) {
	this.pm = pm;
};

DeclarationAttaquantPhase.prototype.execute = function() {
	setTimeout(this.next.bind(this), Duration.DECLARATION_ATTAQUANT);
	return PHASE.WAIT;
};

DeclarationAttaquantPhase.prototype.valid = function(player) {
	return false;
};

DeclarationAttaquantPhase.prototype.next = function() {
	this.pm._next = PHASE.DECLARATION_BLOQUEUR;
	this.pm.next();
};

DeclarationAttaquantPhase.prototype.end = function() {
};