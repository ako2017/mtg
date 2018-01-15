EntretientPhase = function(pm) {
	this.pm = pm;
};

EntretientPhase.prototype.execute = function() {
	setTimeout(this.next.bind(this), Duration.ENTRETIENT);
	return PHASE.WAIT;
};

EntretientPhase.prototype.valid = function(player) {
	return false;
};

EntretientPhase.prototype.next = function() {
	this.pm._next = PHASE.PIOCHE;
	this.pm.next();
};

EntretientPhase.prototype.end = function() {
};