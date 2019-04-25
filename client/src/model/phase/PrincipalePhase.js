class PrincipalePhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.PRINCIPALE);
		this.phaseNum = 0;
	}

	execute() {
		return PHASE.WAIT;
	}

	valid(player) {
		this.pass(player);
		if (this.checkAllPass()) {
			return this.phaseNum == 0 ? PHASE.DECLARATION_ATTAQUANT : PHASE.FIN;
		}
		return PHASE.WAIT;
	}

	end() {
		this.phaseNum = (this.phaseNum + 1) % 2;
	}

	isAuthorized(action, data) {
		if(this.pm.game.stack.needCible()) 
			return false;
		if('poseCard' == action) {
			if(this.pm.game.isPlayerWithToken(data.player)) {
				if(this.pm.game.isPlayerActif(data.player)) {
					return this.pm.game.stack.canPlayCardOfType(data.card.type) && data.player.canPoseCard(data.card);
				}
				else if(data.card.type == TypeCard.EPHEMERE || data.card.type == TypeCard.CAPACITY && data.player.canPoseCard(data.card)) {
					return true;
				}
			}
		}
		else if('valid' == action) {
			if(this.pm.game.isPlayerWithToken(data.player))
				return true;
		}
		return false;
	}

}