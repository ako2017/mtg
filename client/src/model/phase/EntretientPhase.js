class EntretientPhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.ENTRETIENT);
	}

	execute() {
		return PHASE.WAIT;
	}
	
	valid(player) {
		this.pass(player);
		if(!this.checkAllPass()) {
			return PHASE.WAIT;
		}
		return PHASE.PIOCHE;
	}
	
	end() {
	}

	isAuthorized(action, data) {
		if('poseCard' == action) {
			if(this.pm.game.isPlayerWithToken(data.player) && (data.card.type == TypeCard.EPHEMERE || data.card.type == TypeCard.CAPACITY) && !this.pm.game.stack.needCible() && data.player.canPoseCard(data.card)) {
				return true;
			}
		}
		else if('valid' == action) {
			if(this.pm.game.isPlayerWithToken(data.player))
				return true;
		}
		return false;
	}

}