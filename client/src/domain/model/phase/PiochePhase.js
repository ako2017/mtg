class PiochePhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.PIOCHE);
		this.firstPioche = true;
	}

	execute() {
		if(this.firstPioche) {
			this.firstPioche = false;
			return PHASE.WAIT;
		}
		else {
			this.game.getPlayerActif().pioche();
			return PHASE.WAIT;
		}
	}
	
	valid(player) {
		this.game.pass(player);
		if(!this.game.checkAllPass()) {
			return PHASE.WAIT;
		}
		return PHASE.PRINCIPALE;
	}
	
	end() {
	}

	isAuthorized(action, data) {
		if('poseCard' == action) {
			if(this.game.isPlayerWithToken(data.player) && data.card.type == TypeCard.EPHEMERE && !this.game.stack.needCible() && data.player.canPoseCard(data.card)) {
				return true;
			}
		}
		else if('valid' == action) {
			if(this.game.isPlayerWithToken(data.player))
				return true;
		}
		return false;
	}

}