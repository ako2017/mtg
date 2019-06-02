class AddCapacityEffect extends Effet {
	constructor(cibleValidator,capacity, ttl) {
		super(cibleValidator);
		this.capacity = capacity;
		this.ttl = ttl;
	}
	
	execute() {
		this.cibles.forEach(function(cible) {
			cible.addCapacity(this.capacity, this.ttl);
		});		
	}
}