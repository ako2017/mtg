PoseCardService = function () {

};

PoseCardService.prototype.execute = function() {
	if(this.canExecute() {
		this._execute();
	}
};

PoseCardService.prototype._execute = function() {
	if (player.poseCard(card, this.stack)) {
		player.payMana(card.mana);
		if (this.stack.needCible()) {
			event.type = GameEvent.NEED_CIBLE;
			this.notify(event);
			this.state = State.NEED_CIBLE;
		}
	}
	
};

PoseCardService.prototype.canExecute = function() {
	if(card.type == TypeCard.TERRAIN) {
		if(!game.isPlayerActif(player)) 
			return this.error("vous n'etes pas le joueur actif");
		if(player.hasPoseTerrain) 
			return this.error("vous ne pouvez poser qu'un terrain par tour");	
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

	if (this.stack.needCible()) {
		errors.push("cible requise");
		return false;
	}
	if (!this.isPlayerWithToken(player)) {
		sendEvent(GameEvent.ERROR,"vous n'avez pas la main",this);
		return;
	}
	if (player.poseCard(card, this.stack)) {
		if (this.stack.needCible()) {
			event.type = GameEvent.NEED_CIBLE;
			this.notify(event);
			this.state = State.NEED_CIBLE;
		}
	}

};