class FinPhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.FIN);
	}

	execute() {
		return PHASE.NETTOYAGE;
	}
	
	valid(player) {
		this.pass(player);
		if (this.checkAllPass()) {
			return PHASE.NETTOYAGE;
		}
		return PHASE.WAIT;
	}
	
	end() {
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
		return false;
	}

}
