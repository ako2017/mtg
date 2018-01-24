ScriptCapacity = function (card) {
	this.card = card;
	this.trigger = null;
	this.action = null;
	this.type = TypeCard.CAPACITY;
	this.mana = [0,0,0,0,0,0];
	this.cibleRule = null;
	this.cibles = [];
};

ScriptCapacity.prototype.init = function init(data) {
	this.trigger = data.trigger;
	this.action = data.action;
	this.mana = data.mana;
	this.cibleRule = data.cible;
};

ScriptCapacity.prototype.execute = function(ctx) {
	eval(this.action);
};

ScriptCapacity.prototype.isValidCible = function(cibles) {
	return eval(this.cibleRule);
};

Stack.prototype.setCible = function(cibles) {
	this.cibles = cibles;
};

ScriptCapacity.prototype.needCible = function() {
	return this.cibleRule != null;
};

ScriptCapacity.prototype.isCapacityByTrigger = function(trigger, source) {
	if(this.trigger) {
		return eval(this.trigger);	
	}
	return false;
};