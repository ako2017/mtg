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
				this.pm._next = PHASE.DECLARATION_ATTAQUANT;
				return true;
			}
		}
	}
	if (this.phaseNum == 1) {
		if (this.pm.game.isPlayerWithToken(player)) {
			player.pass();
			this.pm.game.nextToken();
			if (this.pm.game.checkAllPass()) {
				this.pm._next = PHASE.FIN;
				return true;
			}
		}
	}
	return false;
};

PrincipalePhase.prototype.end = function() {
	this.phaseNum = (this.phaseNum + 1) % 2;
};