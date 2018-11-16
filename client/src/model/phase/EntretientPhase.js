EntretientPhase = function(pm) {
	this.pm = pm;
	this.phaseId = PHASE.ENTRETIENT;
};

EntretientPhase.prototype.execute = function() {
	return PHASE.PIOCHE;
};

EntretientPhase.prototype.valid = function(player) {
	return false;
};

EntretientPhase.prototype.end = function() {
};