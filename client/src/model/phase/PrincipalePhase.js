PrincipalePhase = function(pm) {
	this.pm = pm;
	this.phaseNum = 0;
	this.phaseId = PHASE.PRINCIPALE;
};

PrincipalePhase.prototype.execute = function() {
	return PHASE.WAIT;
};

PrincipalePhase.prototype.valid = function(player) {
	if (this.phaseNum == 0) {
		if (this.pm.game.isPlayerWithToken(player)) {
			player.pass();
			this.pm.game.nextToken();
			if (this.pm.game.checkAllPass()) {
				return PHASE.DECLARATION_ATTAQUANT;
			}
		}
	}
	if (this.phaseNum == 1) {
		if (this.pm.game.isPlayerWithToken(player)) {
			player.pass();
			this.pm.game.nextToken();
			if (this.pm.game.checkAllPass()) {
				return PHASE.FIN;
			}
		}
	}
	return PHASE.WAIT;
};

PrincipalePhase.prototype.end = function() {
	this.phaseNum = (this.phaseNum + 1) % 2;
};