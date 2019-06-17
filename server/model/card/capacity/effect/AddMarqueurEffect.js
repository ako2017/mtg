const Effect = require('./Effect');

class AddMarqueurEffect extends Effect {
	constructor(force,endurance,ttl) {
		super();
		this.force = force;
		this.endurance = endurance;
		this.ttl = ttl;
	}
	
	*execute() {
		for(var i=0;i<this.getTargets().length;i++) {
			this.getTargets()[i].addMarqueur(this.force,this.endurance,this.ttl);
		}
	}
}

module.exports = AddMarqueurEffect;