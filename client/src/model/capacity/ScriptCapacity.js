Capacity = function (trigger, script, card) {
	this.card = card;
	this.trigger = trigger;
	this.script = script;
	this.type = TypeCard.CAPACITY;
	this.mana = [0,0,0,0,0,0];
};

Capacity.prototype.execute = function(context) {

};

Capacity.prototype.hasMana = function() {
	for(var i=0;i<this.mana.length;i++) {
		if(mana[i]>0)
			return true;
	}
	return false;
};

