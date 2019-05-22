class PhaseManager extends Observable {
	constructor(game) {
		super();
		this.phases = [];
		this.phases[PHASE.DISTRIBUTION] = new DistributionPhase(this);
		this.phases[PHASE.WHO_BEGINS] = new WhoBeginsPhase(this);
		this.phases[PHASE.DEGAGEMENT] = new DegagementPhase(this);
		this.phases[PHASE.ENTRETIENT] = new EntretientPhase(this);
		this.phases[PHASE.PIOCHE] = new PiochePhase(this);
		this.phases[PHASE.PRINCIPALE] = new PrincipalePhase(this);
		this.phases[PHASE.DECLARATION_ATTAQUANT] = new DeclarationAttaquantPhase(this);
		this.phases[PHASE.DECLARATION_BLOQUEUR] = new DeclarationBloqueurPhase(this);
		this.phases[PHASE.ATTRIBUTION_BLESSURE] = new AttributionBlessurePhase(this);
		this.phases[PHASE.FIN] = new FinPhase(this);
		this.phases[PHASE.NETTOYAGE] = new NettoyagePhase(this);
		this.game = game;
		this.currentPhase = null;
		this._next;
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
		this.unPassAll();
		if (!this.game.stack.isEmpty()) {
			this.game.unPassAll();
			this.game.stack.resolve(this.game);
			return false;
		} else {
			return true;
		}
	}
	
	isAuthorized(action, data) {
		return this.currentPhase.isAuthorized(action, data);
	}
	
	next() {
		while (this._next != PHASE.WAIT && this.canGoNext()) {
			this.currentPhase.end();
			this.currentPhase = this.phases[this._next];
			sendEvent(GameEvent.CHANGE_PHASE,this._next,this.game);
			this._next = this.currentPhase.execute(this.game);
		}
	}

}