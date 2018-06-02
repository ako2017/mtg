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
		setTimeout(this.nextFin.bind(this), Duration.DECLARATION_ATTAQUANT);
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
				this.pm._next = PHASE.DECLARATION_BLOQUEUR;
				return true;
			}
			else {
				this.pm._next = PHASE.FIN;
				return true;	
			}
		}
	}
	return false;
};

DeclarationAttaquantPhase.prototype.nextFin = function() {
	this.pm._next = PHASE.FIN;
	this.pm.next();
};

DeclarationAttaquantPhase.prototype.next = function() {
	this.pm._next = PHASE.DECLARATION_BLOQUEUR;
	this.pm.next();
};

DeclarationAttaquantPhase.prototype.end = function() {
};