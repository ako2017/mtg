DeclarationBloqueurPhase = function(pm) {
	this.pm = pm;
};

DeclarationBloqueurPhase.prototype.execute = function() {
	setTimeout(this.next.bind(this), Duration.DECLARATION_BLOQUEUR);
	return PHASE.WAIT;
};

DeclarationBloqueurPhase.prototype.valid = function(player) {
	return false;
};

DeclarationBloqueurPhase.prototype.next = function() {
	this.pm._next = PHASE.ATTRIBUTION_BLESSURE;
	this.pm.next();
};

DeclarationBloqueurPhase.prototype.end = function() {
};