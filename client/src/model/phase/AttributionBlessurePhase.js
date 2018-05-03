AttributionBlessurePhase = function(pm) {
	this.pm = pm;
	this.phaseId = PHASE.ATTRIBUTION_BLESSURE;
};

AttributionBlessurePhase.prototype.execute = function() {
	var game = this.pm.game;
	this.pm.game.getPlayerActif().attaquants.forEach(function(card) {
		card.attack(game.getPlayerNonActif());
	});
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