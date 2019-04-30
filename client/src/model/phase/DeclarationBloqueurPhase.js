class DeclarationBloqueurPhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.DECLARATION_BLOQUEUR);
		this.passDeclarationBloqueur = false;
	}

	execute() {
		if(!this.pm.game.getPlayerWithToken().canDeclareBloqueur()) {
			return PHASE.ATTRIBUTION_BLESSURE;
		}
		return PHASE.WAIT;
	}
	
	valid(player) {
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
	}


	valid(player) {
		this.pass(player);
		if(!this.checkAllPass()) {
			return PHASE.WAIT;
		}
		return PHASE.ATTRIBUTION_BLESSURE;
	}	
	
	end() {
		this.passDeclarationBloqueur = false;
	}


	declarationBloqueur(player, card) {
		if(!this.isAuthorized('declarationBloqueur',{player:player,card:card})) 
			return false;
		player.declarationBloqueur(card);
	}

	passDeclarationBloqueur() {
		if(!this.isAuthorized('passDeclarationAttaquant',{player:player})) 
			return;
		this.passDeclarationBloqueur = true;
	}


	isAuthorized(action, data) {
		if(this.pm.game.stack.needCible()) 
			return false;
		if('poseCard' == action) {
			if(this.pm.game.isPlayerWithToken(data.player)) {
				if(data.card.type == TypeCard.EPHEMERE || data.card.type == TypeCard.CAPACITY && data.player.canPoseCard(data.card)) {
					return true;
				}
			}
		}
		else if('valid' == action) {
			if(this.pm.game.isPlayerWithToken(data.player))
				return true;
		}
		else if('declarationBloqueur' == action && !this.passDeclarationBloqueur) {
			if(this.pm.game.isPlayerWithToken(data.player) && data.card.canBloque())
				return true;
		}
		else if('passDeclarationBloqueur' == action && !this.passDeclarationBloqueur) {
			if(this.pm.game.isPlayerWithToken(data.player))
				return true;
		}
		return false;
	}

}