const Effect = require('./Effect');

class AddCapacityEffect extends Effect {
	constructor(capacity, ttl) {
		super();
		this.capacity = capacity;
		this.ttl = ttl;
	}
	
	execute() {
		this.cibles.forEach(function(cible) {
			cible.addCapacity(this.capacity, this.ttl);
		});		
	}
}

module.exports = AddCapacityEffect;