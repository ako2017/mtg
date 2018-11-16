HandlerMsg = function () {
	this.isStarting = false;
	this.res = [];
};

HandlerMsg.prototype.constructor = HandlerMsg;

HandlerMsg.prototype.init = function() {

};

HandlerMsg.prototype.canUse = function() {
	return !this.isStarting;
}

HandlerMsg.prototype.start = function() {
	if(!this.canUse()) return false;
	this.isStarting = true;
	this.res = [];
	return true;
}

HandlerMsg.prototype.stop = function() {
	this.isStarting = false;
}

HandlerMsg.prototype.onReceive = function(event) {
	this.res.push(event);
};

HandlerMsg.prototype.send = function() {
};

HandlerMsg.prototype.getLastSend = function() {
	return this.res;
};