const Observable = require('../Observable.js');

class Card extends Observable {
	constructor() {
		super();
		this.force = 0;
		this.endurance = 0;
		this.mana= [];
		this.owner = null;
		this.type=null;
		this.isEngaged = false;
		this.vol = false;
		this.celerite = false;
		this.vigilance = false;
		this.capacities = [];
		this.marqueurs = [];
		this.capabilities = [0,0,0];
		this.blockedBy = null;
		this.malInvocation = false;
		this.enduranceCpt = 0;
		this.uid = UID++;
		this.id = null;
	}

	addCapacity(capacity) {
		capacity.setCard(this);
		this.capacities.push(capacity);
	}

	/**
	 * Ajoute la capacité vol
	 * @param {TimeToLive} ttl la durée de vie de la capacité 
	 */
	addVol(ttl) {
		return this.addCapability(Capability.VOL,ttl);
	}

	/**
	 * Ajoute la capacité célérité
	 * @param {TimeToLive} ttl la durée de vie de la capacité 
	 */
	addCelerite(ttl) {
		return this.addCapability(Capability.CELERITE,ttl);
	}

	/**
	 * Ajoute la capacité vigilance
	 * @param {TimeToLive} ttl la durée de vie de la capacité 
	 */
	addVigilance(ttl) {
		return this.addCapability(Capability.VIGILANCE,ttl);
	}

	addCapability(capacity, ttl) {
		capTmp = this.capabilities[capacity];
		this.capabilities
		if(capTmp != Ttl.INF) {
			this.capabilities[capacity] 
			this.capabilities= ttl;
		}
	}

	/**
	 * Vérifie si la carte à la capacité vol
	 * @returns {boolean} true si oui false sinon
	 */
	hasVol() {
		return this.hasCapacity(Capacity.VOL);
	}

	/**
	 * Vérifie si la carte à la capacité célérité
	 * @returns {boolean} true si oui false sinon
	 */
	hasCelerite() {
		return this.hasCapacity(Capacity.CELERITE);
	}

	/**
	 * Vérifie si la carte à la capacité vigilance
	 * @returns {boolean} true si oui false sinon
	 */
	hasVigilance() {
		return this.hasCapacity(Capacity.VIGILANCE);
	}

	hasCapacity(capacity) {
		return this.capabilities[capacity] 
		this.capabilities!= Ttl.NONE;
	}

	/**
	 * Ajoute un marqueur de force ou d'endurance à la carte
	 * @param {Number} force la force à ajouter
	 * @param {Number} endurance k'rndurance à ajouter
	 * @param {TimeToLive} ttl la durée de vie du marqueur 
	 */
	addMarqueur(force,endurance,ttl) {
		this.marqueurs.push({force:force,endurance:endurance,ttl:ttl});
	}

	/**
	 * Retourne la force de la carte
	 * @returns {Number} la force de la carte
	 */
	getForce() {
		var force = this.force;
		for(var i=0;i<this.marqueurs.length;i++) {
			force += this.marqueurs[i].force;
		}
		return force;
	}

	/**
	 * Retourne l'endurance de la carte
	 * @returns {number} l'endurance de la carte
	 */
	getEndurance() {
		var endurance = this.endurance;
		for(var i=0;i<this.marqueurs.length;i++) {
			endurance += this.marqueurs[i].endurance;
		}
		return endurance;
	}

	/**
	 * recalcul les marqueur et les capacités de la carte
	 * @param {PHASE} phase la phase de jeu
	 */
	calcState(phase) {
		for(var i=0;i<this.capabilities.length;i++) {
			var capability = this.capabilities[i];
			if(this.capability == Ttl.EOT && phase == Phase.FIN) {
				this.capabilities[i] = Ttl.NONE
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
	}

	init(data) {
		this.force = data.force;
		this.endurance = data.endurance;
		this.frontPic = data.extension + '#' + data.numero;
		this.mana = data.mana;//[data.col1,data.col2,data.col3,data.col4,data.col5,data.col6];
		this.vol = data.vol;
		this.celerite = data.celerite;
		this.vigilance = data.vigilance;
		this.type = data.type;
		for(var i=0;i<data.capacities.length;i++) {
			var capacity = new ScriptCapacity(this);
			capacity.init(data.capacities[i]);
			this.capacities.push(capacity);
		}
	}

	engage() {
		this.isEngaged = true;
		sendEvent(GameEvent.ENGAGEMENT, this, this);
	}

	gotoCemetery() {
		this.owner.cemetery.push(this);
		this.degage();
		sendEvent(GameEvent.GOTO_CEMETERY, this, this);
	}

	canDegage() {
		return !this.isEngaged;
	}

	degage() {
		if(!this.canDegage()) return false;
		this.isEngaged = false;
		sendEvent(GameEvent.DEGAGEMENT, this, this);
		return true;
	}

	/**
	 * Vérifie si la carte peut bloquer celle en paramètre
	 * @param {Card} card la carte à bloquer
	 */
	canBloque(card) {
		return !this.isEngaged && this.type == TypeCard.CREATURE && card.type == TypeCard.CREATURE;
	}

	/**
	 * Vérifie si la carte peut attaquer celle en paramètre
	 * @param {Card} card la carte à attaquer
	 */
	canAttaque() {
		return !this.isEngaged && this.type == TypeCard.CREATURE && !this.hasMalInvocation();
	}

	/**
	 * Effectue une attaque sur le joueur ou sur le bloqueur si i y en a un
	 * @param {Player} player le joueur à attaquer
	 */
	attack(player) {
		if(this.blockedBy) {
			this.blockedBy.damage(this.getForce());
			this.damage(this.blockedBy.getForce());
		}
		else {
			player.damage(-this.getForce());
		}
	}

	damage(force) {
		this.enduranceCpt-=force;
		if(this.enduranceCpt <= 0) {
			sendEvent(GameEvent.CARD_DIE, {card : this}, this);
			this.gotoCemetery();
			this.owner.battlefield.removeByValues(this);
		}
	}

	restaure() {
		this.enduranceCpt = this.getForce();
		this.blockedBy = null;
		this.blockCard = null;
	}

	getCapacityByTrigger(trigger, source) {
		for(var i=0;i<this.capacities.length;i++) {
			var capacity =  this.capacities[i];
			if(capacity.isTriggerActif(trigger,source)) {
				return capacity;
			}
		}
		return null;
	}

	/**
	 * Vérifie si la carte a le mal d'invocation
	 * @returns {boolean} true si elle a le mal d'invocation false sinon
	 */
	hasMalInvocation() {
		return this.malInvocation;
	}

	setMalInvocation(malInvocation) {
		this.malInvocation = malInvocation;
		sendEvent(GameEvent.MAL_INVOCATION, {value : this.malInvocation}, this);
	}

	enterBattlefield() {
		this.owner.battlefield.push(this);
		this.setMalInvocation(true);
		sendEvent(GameEvent.ENTER_BATTLEFIELD, {value : this}, this);
	}

	waitResponse() {
		for(var i=0;i<this.capacities.length;i++) {
			if(this.capacities[i].isFree() && this.capacities[i].waitResponse()) {
				return true;
			}
		}
		return false;
	}

	*ask() {
		var capacity = null;
		for(var i=0;i<this.capacities.length;i++) {
			if(this.capacities[i].isFree() && this.capacities[i].waitResponse()) {
				capacity = this.capacities[i];
				break;
			}
		}
		if(capacity) {
			yield* capacity.ask();
		}
	}

}

module.exports = Card;