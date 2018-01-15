DegagementPhase = function(pm) {
	this.pm = pm;
};

DegagementPhase.prototype.execute = function() {
	this.pm.game.getPlayerWithToken().degagement();
	setTimeout(this.next.bind(this), Duration.DEGAGEMENT);
	return PHASE.WAIT;
};

DegagementPhase.prototype.valid = function(player) {
	return false;
};

DegagementPhase.prototype.next = function() {
	this.pm._next = PHASE.ENTRETIENT;
	this.pm.next();
};

DegagementPhase.prototype.end = function() {
};