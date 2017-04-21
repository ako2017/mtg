Card = function (player) {
	Observable.call(this);
	this.force = 0;
	this.endurance = 0;
	this.nom="nom";
	this.text="descriptif de la carte";
	this.mana= [];
	this.owner = player;
	this.type="type de la carte";
	this.typeC=null;
	this.frontPic = "";
	this.isEngaged = false;
	this.vol = false;
	this.celerite = false;
	this.vigilance = false;
	this.capacities = [];
	this.marqueurs = [];
	this._capacities = [0,0,0];
	this.blockedBy = null;
	this.malInvocation = false;
};

Card.prototype = Object.create(Observable.prototype);

Card.prototype.addVol = function(ttl) {
	return this.addCapacity(Capacity.VOL,ttl);
};

Card.prototype.addCelerite = function(ttl) {
	return this.addCapacity(Capacity.CELERITE,ttl);
};

Card.prototype.addVigilance = function(ttl) {
	return this.addCapacity(Capacity.VIGILANCE,ttl);
};

Card.prototype.addCapacity = function(capacity, ttl) {
	capTmp = this._capacities[capacity];
	if(capTmp != Ttl.INF) {
		this._capacities[capacity] = ttl;
	}
};

Card.prototype.hasVol = function() {
	return this.hasCapacity(Capacity.VOL);
};

Card.prototype.hasCelerite = function() {
	return this.hasCapacity(Capacity.CELERITE);
};

Card.prototype.hasVigilance = function() {
	return this.hasCapacity(Capacity.VIGILANCE);
};

Card.prototype.hasCapacity = function(capacity) {
	return this._capacities[capacity] != Ttl.NONE;
};

Card.prototype.addMarqueur = function(force,endurance,ttl) {
	this.marqueurs.push({force:force,endurance:endurance,ttl:ttl});
};

Card.prototype.getForce = function() {
	var force = this.force;
	for(var i=0;i<this.marqueurs.length;i++) {
		force += this.marqueurs[i].force;
	}
	return force;
};

Card.prototype.getEndurance = function() {
	var endurance = this.endurance;
	for(var i=0;i<this.marqueurs.length;i++) {
		endurance += this.marqueurs[i].endurance;
	}
	return endurance;
};

Card.prototype.calcState = function(phase) {
	for(var i=0;i<this._capacities.length;i++) {
		var capacity = this._capacities[i];
		if(capacity == Ttl.EOT && phase == Phase.FIN) {
			this._capacities[i] = Ttl.NONE;
		}
	}
	var toDelete=[];
	for(var i=0;i<this.marqueurs.length;i++) {
		var marqueur = this.marqueurs[i];
		if(marqueur.ttl == Ttl.EOT && phase == Phase.FIN) {
			toDelete.push(marqueur);
		}
	}
	this.marqueurs.removeByValues(toDelete);
};

Card.prototype.getTriggerCapacity = function(trigger) {
	for(var i=0;i<this.capacities.length;i++) {
		var capacity = this.capacities[i]; 
		if(capacity.trigger == trigger) {
			return capacity;
		}
	}
	return null;
};

Card.prototype.init = function init(data) {
	this.force = data.force;
	this.endurance = data.endurance;
	this.frontPic = data.extension + '#' + data.numero;
	this.mana = [data.col1,data.col2,data.col3,data.col4,data.col5,data.col6];
	this.vol = data.vol;
	this.celerite = data.celerite;
	this.vigilance = data.vigilance;
	this.typeC = data.type;
	for(var i=0;i<data.capacities.length;i++) {
		var capacity = new ScriptCapacity(this);
		capacity.init(data.capacities[i]);
		this.capacities.push(capacity);
	}
};

Card.prototype.engage = function() {
	this.isEngaged = true;
	var event = {};
	event.type = GameEvent.ENGAGEMENT;
	event.data = this.isEngaged;
	this.notify(event);
};

Card.prototype.degage = function() {
	this.isEngaged = false;
	var event = {};
	event.type = GameEvent.DEGAGEMENT;
	event.data = this.isEngaged;
	this.notify(event);
};

Card.prototype.isEngaged = function() {
	return this.isEngaged;
};

Card.prototype.attack = function(player) {
	if(this.blockedBy) {
		this.blockedBy.damage(this.getForce());
		this.damage(this.blockedBy.getForce());
	}
	else {
		player.life -= this.getForce();
	}
};

Card.prototype.getCapacityActive = function() {
	for(var i=0;i<this.capacities.length;i++) {
		var capacity =  this.capacities[i];
		if(!capacity.hasMana()) {
			capacity.execute(context);
		}
	}
};

Card.prototype.onEnterBattlefield = function() {
	this.owner.battlefield.push(this);
};