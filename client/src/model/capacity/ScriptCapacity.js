ScriptCapacity = function (card) {
	this.card = card;
	this.trigger = null;
	this.script = null;
	this.type = TypeCard.CAPACITY;
	this.mana = [0,0,0,0,0,0];
};

ScriptCapacity.prototype.init = function init(data) {
	this.trigger = data.trigger;
	this.script = data.action;
	this.mana = [data.col1,data.col2,data.col3,data.col4,data.col5,data.col6];
};

ScriptCapacity.prototype.execute = function(context) {
	eval(this.script);
};

ScriptCapacity.prototype.hasMana = function() {
	for(var i=0;i<this.mana.length;i++) {
		if(this.mana[i]>0)
			return true;
	}
	return false;
};

