class PrincipalePhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.PRINCIPALE);
		this.phaseNum = 0;
	}

	execute() {
		return PHASE.WAIT;
	}

	valid(player) {
		if (this.phaseNum == 0) {
			this.game.pass(player);
			if (this.game.checkAllPass()) {
				return PHASE.DECLARATION_ATTAQUANT;
			}
		}
		if (this.phaseNum == 1) {
			this.game.pass(player);
			if (this.game.checkAllPass()) {
				return PHASE.FIN;
			}
		}
		return PHASE.WAIT;
	}

	end() {
		this.phaseNum = (this.phaseNum + 1) % 2;
	}

	isAuthorized(action, data) {
		if('poseCard' == action) {
			if(this.game.isPlayerWithToken(data.player)) {
				if(this.game.isPlayerActif(data.player)) {
					if(this.game.stack.containsType(data.card.type))
						return false;
					else
						return true;
				}
				else if(data.card.type == TypeCard.EPHEMERE || data.card.type == TypeCard.CAPACITY && !this.game.stack.needCible() && data.player.canPoseCard(data.card)) {
					return true;
				}
			}
		}
		else if('valid' == action) {
			if(this.game.isPlayerWithToken(data.player))
				return true;
		}
		return false;
	}

}