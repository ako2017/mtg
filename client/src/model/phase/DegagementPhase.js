DegagementPhase = function(pm) {
	this.pm = pm;
	this.phaseId = PHASE.DEGAGEMENT;
};

DegagementPhase.prototype.execute = function() {
	if(this.pm.game.getPlayerWithToken().degagement()) {
		setTimeout(this.next.bind(this), Duration.DEGAGEMENT);
	}
	else {
		setTimeout(this.next.bind(this), 0);
	}
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