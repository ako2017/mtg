class Sort {
	constructor(obj) {
		this.obj = obj;
		this.currentCapacity = null;
	}

	/**
	 * Indique si une information complementaire est nécessaire à la réalisation du sort
	 */
	waitInfo() {
		if(this.obj.type == TypeCard.CAPACITY) {
			return this.obj.waitInfo();
		}
		else {
			var freeCapacity = this.obj.getFreeCapacity();
			if(freeCapacity != null) {
				return freeCapacity.waitInfo();
			}
			return {result:false};
		}
	}

	isFinished() {
		return this.currentCapacity == null || this.currentCapacity.isFinished();
	}

	getType() {
		return this.obj.type;
	}

	/**
	 * méthode effectuant la résolution du sort
	 */
	resolve(game,stack) {
		if(this.obj.type == TypeCard.CREATURE) {
			this.obj.enterBattlefield();
		}
		if(this.obj.type == TypeCard.CAPACITY) {
			this.obj.execute(game);
		}

/**		if(this.capacityRunning()) {
			this.currentCapacity.execute(game);
			return;
		}
		this.currentCapacity = this.getCapacity();
		if(this.currentCapacity != null) {
			this.currentCapacity.execute(game);
		}*/
	}

	capacityRunning() {
		return this.currentCapacity != null && !this.currentCapacity.isFinished();
	}
	
}