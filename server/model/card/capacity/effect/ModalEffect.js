const Effect = require('./Effect');

class ModalEffect extends Effect {
	constructor(card,messageDialog, effets) {
		super(card,null);
		this.messageDialog = messageDialog;
		this.effets = effets;
		this.firstCall = true;
	}
	
	execute() {
		if(this.firstCall) {
			sendMessage(this.messageDialog);
			this.firstCall = true;
			return false;
		}
		else {
			return this.effets[this.effetNumber].execute();
		}
	}

	setEffetNumber(effetNumber) {
		if(effetNumber >= 0 && effetNumber < this.effetNumber.length) {
			this.effetNumber = effetNumber;
			return true;
		}
		return false;
	}

}

module.exports = ModalEffect;