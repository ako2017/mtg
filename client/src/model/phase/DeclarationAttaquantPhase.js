DeclarationAttaquantPhase = function(pm) {
	this.pm = pm;
	this.phaseId = PHASE.DECLARATION_ATTAQUANT;
};

DeclarationAttaquantPhase.prototype.execute = function() {
	var passDeclare = true;
	this.pm.game.getPlayerActif().battlefield.every(function(card, index) {
		if(card.canAttaque()) {
			passDeclare = false;
			return true;
		}
		return false;
	});
	if(passDeclare) {
		return PHASE.DECLARATION_BLOQUEUR;
	}
	return PHASE.WAIT;
};

DeclarationAttaquantPhase.prototype.valid = function(player) {
	if (this.pm.game.isPlayerWithToken(player)) {
		player.pass();
		this.pm.game.nextToken();
		if (this.pm.game.checkAllPass()) {
			
			//on a des attaquants on va les bloquer
			if(this.pm.game.getPlayerActif().attaquants.length>0) {
				this.pm.game.nextToken();
				return PHASE.DECLARATION_BLOQUEUR;
			}
			else {
				return PHASE.FIN;	
			}
		}
	}
	return PHASE.WAIT;
};

DeclarationAttaquantPhase.prototype.end = function() {
};