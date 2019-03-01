AccessHelper = function () {
	this.error;
};


AccessHelper.prototype.canPoseCard = function(game, player,,card, stack) {
	if(card.type == TypeCard.TERRAIN) {
		if(!game.isPlayerActif(player)) return this.error("vous n'etes pas le joueur actif");
		if(player.hasPoseTerrain) return this.error("vous ne pouvez poser qu'un terrain par tour");	
	}
	if(!player.canPayMana(card.mana)) {
		return this.error("vous n'avez pas assez de mana");	
	}
	if(card.type == TypeCard.CREATURE || card.type == TypeCard.RITUEL || card.type == TypeCard.ENCHANTEMENT || card.type == TypeCard.ARTEFACT){
		if(!game.pm.isPhase(PHASE.PRINCIPALE) || !game.isPlayerActif(player)) {
			return this.error("carte jouable en phase principale par le joueur actif");
		}
		if(stack.containsType(card.type)) {
			return this.error("une carte de ce type est deja dans la pile");
		}
	}
	return true;
};

AccessHelper.prototype.canMuligane = function(game, player) {
	if(!game.pm.isPhase(PHASE.DISTRIBUTION)) {
		return this.error("vous ne pouvez pas faire de muligane");
	}
	
	var nbCard = player.hand.length-1;
	
	if(nbCard <= 0) {
		return this.error("vous ne pouvez pas faire de muligane");
	}
	return true;
};

AccessHelper.prototype.canDeclareAttaquant = function(game, player,card) {
	if(!this.game.pm.isPhase(PHASE.DECLARATION_ATTAQUANT) || !this.game.isPlayerActif(this)) {
		return this.error("vous ne pouvez pas faire cette action");
	}
	if(card.canAttaque()) {
		return this.error("vous ne pouvez pas attaquer avec cette carte");
	}
	return true;
};

AccessHelper.prototype.canRetirerCard = function(game, player,card,game) {
	if (!game.isPlayerWithToken(player)) {
		return this.error("vous n'avez pas la main");
	}
	
	if(this.player.hand.length <= 7) {
		return this.error("nombre de carte atteint");
	}
	return true;
};

AccessHelper.prototype.canDeclareBloqueur = function(game, bloqueur,attaquant) {
	return bloqueur.canBloque(attaquant);
};

AccessHelper.prototype.canEngage = function(game, player, card) {
	if(game.isPlayerActif(player) && card.type == TypeCard.TERRAIN) {
		return true;
	}
	return this.error("vous ne pouvez pas engager cette carte");
};




AccessHelper.prototype.error = function(errorName) {
	this.error = errorName;
	return false;
};
