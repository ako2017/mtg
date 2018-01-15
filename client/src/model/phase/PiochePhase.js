PiochePhase = function(pm) {
	this.pm = pm;
};

PiochePhase.prototype.execute = function() {
	if (!this.pm.game.getPlayerActif().canPioche) {
		this.pm.game.getPlayerActif().canPioche = true;
		setTimeout(this.next.bind(this), Duration.PIOCHE);
		return PHASE.WAIT;
	} else {
		this.pm.game.getPlayerActif().pioche();
		setTimeout(this.next.bind(this), Duration.PIOCHE);
		return PHASE.WAIT;
	}
};

PiochePhase.prototype.valid = function(player) {
	return false;
};

PiochePhase.prototype.next = function() {
	this.pm._next = PHASE.PRINCIPALE;
	this.pm.next();
};

PiochePhase.prototype.end = function() {
};