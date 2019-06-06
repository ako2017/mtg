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
	*resolve(game) {

		if(this.obj.type == TypeCard.CREATURE) {
			alert('creature');
			this.obj.enterBattlefield();
		}
		if(this.obj.type == TypeCard.CAPACITY) {
			alert('capacite');
			yield* this.obj.execute(game);
		}
	}

	capacityRunning() {
		return this.currentCapacity != null && !this.currentCapacity.isFinished();
	}
	
}