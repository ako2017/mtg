class Sort {
	constructor(obj) {
		this.obj = obj;
	}

	getType() {
		return this.obj.type;
	}

	/**
	 * méthode effectuant la résolution du sort
	 */
	*resolve(game) {
		if(this.getType() == TypeCard.CREATURE) {
			this.obj.enterBattlefield();
		}
		if(this.getType() == TypeCard.CAPACITY) {
			yield* this.obj.execute(game);
		}
	}
}

module.exports = Sort;