class DeclarationBloqueurPhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.DECLARATION_BLOQUEUR);
		this.hasDonedeclaration = false;
	}

	execute() {
		return PHASE.WAIT;
	}
	
	valid(player) {
		if (!this.hasDonedeclaration) {
			this.hasDonedeclaration = true;
			return PHASE.WAIT;
		}
		this.game.pass(player);
		if (this.game.checkAllPass()) {
			return PHASE.ATTRIBUTION_BLESSURE;
		}
		return PHASE.WAIT;
	}
	
	end() {
		this.hasDonedeclaration = false;
	}

	isAuthorized(action, data) {
		if('poseCard' == action) {
			if(this.hasDonedeclaration && this.game.isPlayerWithToken(data.player) && (data.card.type == TypeCard.EPHEMERE || data.card.type == TypeCard.CAPACITY) && !this.game.stack.needCible() && data.player.canPoseCard(data.card)) {
				return true;
			}
		}
		else if('declareBloqueur' == action) {
			if(!this.hasDonedeclaration && this.game.isPlayerWithToken(data.player) && data.player.canDeclareBloqueur(data.bloqueur,data.attaquant) && this.game.getPlayerActif().battlefield.contains(data.attaquant)) {
				return true;
			}
		}
		else if('valid' == action) {
			if((!this.game.isPlayerActif(data.player) && !this.hasDonedeclaration)
			 	|| (this.game.isPlayerWithToken(data.player) && this.hasDonedeclaration))
				return true;
		}
		return false;
	}

}