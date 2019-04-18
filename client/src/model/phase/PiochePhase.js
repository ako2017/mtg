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
			this.getPlayerActif().pioche();
			return PHASE.WAIT;
		}
	}
	
	valid(player) {
		this.pass(player);
		if(!this.checkAllPass()) {
			return false;
		}
		this.next(PHASE.PRINCIPALE);
		return true;
	}
	
	end() {
	}

	isAuthorized(action, data) {
		if('poseCard' == action) {
			if(this.pm.game.isPlayerWithToken(data.player) && data.card.type == TypeCard.EPHEMERE && !this.pm.game.stack.needCible() && data.player.canPoseCard(data.card)) {
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