PiochePhase = function(pm) {
	this.pm = pm;
	this.phaseId = PHASE.PIOCHE;
};

PiochePhase.prototype.execute = function() {
	if (!this.pm.game.getPlayerActif().canPioche) {
		this.pm.game.getPlayerActif().canPioche = true;
		return PHASE.PRINCIPALE;
	} else {
		this.pm.game.getPlayerActif().pioche();
		return PHASE.PRINCIPALE;
	}
};

PiochePhase.prototype.valid = function(player) {
	return false;
};

PiochePhase.prototype.end = function() {
};