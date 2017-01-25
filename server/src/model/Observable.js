Observable = function (idPlayer,capacities,capacityOnCreate) {
	this.observers = [];
};

Observable.prototype.addObserver = function(observer) {
	this.observers.push(observer);
};

Observable.prototype.notify = function(event) {
	for(var i=0;i<this.observers.length;i++) {
		this.observers[i].onReceive(event);
	}
};