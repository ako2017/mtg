const Effect = require('./Effect');

class DestroyTarget extends Effect {
	constructor(card) {
		super(card);
		this.target = null;
	}
	
	execute() {
		this.target.destroy();
	}
}

module.exports = DestroyTarget;