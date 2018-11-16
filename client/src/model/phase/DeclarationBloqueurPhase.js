DeclarationBloqueurPhase = function(pm) {
	this.pm = pm;
	this.hasDonedeclaration = false;
	this.phaseId = PHASE.DECLARATION_BLOQUEUR;
};

DeclarationBloqueurPhase.prototype.execute = function() {
	return PHASE.ATTRIBUTION_BLESSURE;
	//return PHASE.WAIT;
};

DeclarationBloqueurPhase.prototype.valid = function(player) {
	if (!this.pm.game.isPlayerActif(player) && !this.hasDonedeclaration) {
		player.pass();
		this.pm.game.nextToken();
		this.hasDonedeclaration = true;
	}
	else if (this.pm.game.isPlayerWithToken(player) && this.hasDonedeclaration) {
		player.pass();
		if (this.pm.game.checkAllPass()) {
			return PHASE.ATTRIBUTION_BLESSURE;
		}
	}
	return PHASE.WAIT;
};


DeclarationBloqueurPhase.prototype.end = function() {
	this.hasDonedeclaration = false;
};