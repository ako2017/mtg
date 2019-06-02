class PhaseManager extends Observable {
	constructor(game) {
		super();
		this.game = game;
		this.phases = [];
		this.currentPhase = null;
		this._next;
	}

	initPhases(phases) {
		this.phases = phases;
	}
	
	isCurrentPhase(phase) {
		return this.currentPhase == this.phases[phase];
	};
	
	start() {
		this.currentPhase = this.phases[PHASE.DISTRIBUTION];
		sendEvent(GameEvent.CHANGE_PHASE,PHASE.DISTRIBUTION,this.game);
		this._next = this.currentPhase.execute(this.game);
	};
	
	isPhase(phaseId) {
		return this.currentPhase.phaseId == phaseId;
	};
	
	valid(player) {
		this._next = this.currentPhase.valid(player);
	}
	
	canGoNext() {
		return this.game.stack.isEmpty() && this.game.checkAllPass();
	}
	
	isAuthorized(action, data) {
		return this.currentPhase.isAuthorized(action, data);
	}
	
	next() {
		if(this._next != PHASE.WAIT) {
			this.currentPhase.end();
			this.currentPhase = this.phases[this._next];
			sendEvent(GameEvent.CHANGE_PHASE,this._next,this.game);
			this._next = this.currentPhase.execute(this.game);
			return true;
		}
		return false;
	}

}