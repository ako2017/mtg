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
			this.pm.game.getPlayerActif().pioche();
			return PHASE.WAIT;
		}
	}
	
	valid(player) {
		this.pm.game.pass(player);
		var players = this.getPlayers();
		for (var i = 0; i < players.length; i++) {
			if (!players[i].hasPass) {
				return false;
			}
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