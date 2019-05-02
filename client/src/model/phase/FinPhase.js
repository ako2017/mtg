class FinPhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.FIN);
	}

	execute() {
		return PHASE.NETTOYAGE;
	}
	
	valid(player) {
		return PHASE.WAIT;
	}
	
	next() {
		this.pm._next = PHASE.NETTOYAGE;
		this.pm.game.nextToken();
		this.pm.game.nextPlayer();
		this.pm.next();
	}
	
	end() {
	}

}
