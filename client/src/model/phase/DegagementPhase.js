DegagementPhase = function(pm) {
	this.pm = pm;
	this.phaseId = PHASE.DEGAGEMENT;
};

DegagementPhase.prototype.execute = function() {
	return PHASE.ENTRETIENT;
};

DegagementPhase.prototype.valid = function(player) {
	return false;
};

DegagementPhase.prototype.end = function() {
};