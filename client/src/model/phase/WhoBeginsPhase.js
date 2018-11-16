WhoBeginsPhase = function(pm) {
	this.pm = pm;
	this.phaseId = PHASE.WHO_BEGINS;
};

WhoBeginsPhase.prototype.execute = function() {
	this.pm.game.playerActif = Math.floor((Math.random() * 10))%2;
	this.pm.game.token = this.pm.game.playerActif;
	this.pm.game.getPlayerActif().canPioche = false;

	sendEvent(GameEvent.WHO_BEGIN,this.pm.game.getPlayerActif(),this.pm.game);
	return PHASE.DEGAGEMENT;
};

WhoBeginsPhase.prototype.valid = function(player, game) {
	return false;
};

WhoBeginsPhase.prototype.end = function() {
};