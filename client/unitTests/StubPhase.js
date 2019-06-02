class StubPhase extends AbstractPhase {
	constructor(pm,phaseId,returnExecute,returnValid) {
		super(pm,phaseId);
		this.returnExecute = returnExecute;
		this.returnValid = returnValid;
	}

	execute() {
		return this.returnExecute;
	}
	
	valid(player) {
		return this.returnValid;
	}
		
	end() {
	}

	isAuthorized(action, data) {
		return false;
	}
}