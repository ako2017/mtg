PhaseManager = function(game) {
	Observable.call(this);
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
	this.phases[PHASE.PRINCIPALE] = new PrincipalePhase(this);
	this.phases[PHASE.FIN] = new FinPhase(this);
	this.phases[PHASE.NETTOYAGE] = new NettoyagePhase(this);
	this.game = game;
	this.currentPhase = null;
	this._next;
};

PhaseManager.prototype = Object.create(Observable.prototype);

PhaseManager.prototype.isCurrentPhase = function(phase) {
	return this.currentPhase == this.phases[phase];
};

PhaseManager.prototype.start = function() {
	this.currentPhase = this.phases[PHASE.DISTRIBUTION];
	var event = {};
	event.type = GameEvent.CHANGE_PHASE;
	event.data = PHASE.DISTRIBUTION;
	this.notify(event);
	this._next = this.currentPhase.execute(this.game);
};

PhaseManager.prototype.valid = function(player) {
	return this.currentPhase.valid(player);
};

PhaseManager.prototype.next = function() {
	if(this._next != PHASE.WAIT) {
		this.currentPhase.end();
		this.currentPhase = this.phases[this._next];
		var event = {};
		event.type = GameEvent.CHANGE_PHASE;
		event.data = this._next;
		this.notify(event);
		this._next = this.currentPhase.execute(this.game);
	}
};