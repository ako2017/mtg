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
			if (this.pm.game.isPlayerWithToken(player)) {
				this.pass(player);
				if (this.pm.game.checkAllPass()) {
					return PHASE.DECLARATION_ATTAQUANT;
				}
			}
		}
		if (this.phaseNum == 1) {
			if (this.pm.game.isPlayerWithToken(player)) {
				this.pass(player);
				if (this.pm.game.checkAllPass()) {
					return PHASE.FIN;
				}
			}
		}
		return PHASE.WAIT;
	}

	end() {
		this.phaseNum = (this.phaseNum + 1) % 2;
	}

}