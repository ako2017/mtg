class Observable {
	constructor() {
		this.observers = [];
	}

	addObserver(observer) {
		this.observers.push(observer);
	}
	
	notify(event) {
		for(var i=0;i<this.observers.length;i++) {
			this.observers[i].onReceive(event);
		}
	}
	
};

