class EntretientPhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.ENTRETIENT);
	}

	execute() {
		return PHASE.PIOCHE;
	}
	
	valid(player) {
		return false;
	}
	
	end() {
	}

}