ScriptCapacity = function (card) {
	this.card = card;
	this.trigger = null;
	this.script = null;
	this.scriptEnd = null;
	this.typeC = TypeCard.CAPACITY;
	this.mana = [0,0,0,0,0,0];
	this.isRunning = false;
	this.cibleRule = null;
};

ScriptCapacity.prototype.init = function init(data) {
	this.trigger = data.trigger;
	this.script = data.action;
	this.scriptEnd = data.action;
	this.mana = [data.col1,data.col2,data.col3,data.col4,data.col5,data.col6];
};

ScriptCapacity.prototype.execute = function(context) {
	if(!this.isRunning) {
		this.isRunning = true;
		eval(this.script);
	}
};

ScriptCapacity.prototype.isFinished = function(context) {
	return eval(this.scriptEnd) && this.isRunning;
};

ScriptCapacity.prototype.hasMana = function() {
	for(var i=0;i<this.mana.length;i++) {
		if(this.mana[i]>0)
			return true;
	}
	return false;
};