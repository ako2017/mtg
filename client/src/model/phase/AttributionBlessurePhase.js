AttributionBlessurePhase = function(pm) {
	this.pm = pm;
};

AttributionBlessurePhase.prototype.execute = function() {
	setTimeout(this.next.bind(this), Duration.ATTRIBUTION_BLESSURE);
	return PHASE.WAIT;
};

AttributionBlessurePhase.prototype.valid = function(player) {
	return false;
};

AttributionBlessurePhase.prototype.next = function() {
	this.pm._next = PHASE.PRINCIPALE;
	this.pm.next();
};

AttributionBlessurePhase.prototype.end = function() {
};