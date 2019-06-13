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
	var sanity = [];
	for (var i = 0; i < this.res.length; i++) {
		var current = null;
		switch(this.res[i].type) {
			case GameEvent.ADD_PLAYER:
				current = {type:GameEvent.ADD_PLAYER,data:this.res[i].data.uid};
				sanity.push(current);
				break;
			case GameEvent.ADD_PLAYER:
				current = {type:GameEvent.GAME_FULL};
				sanity.push(current);
				break;
			case GameEvent.CHANGE_PHASE:	
				break;
			case GameEvent.DISTRIBUTION:
				var cardsP1 = [];
				this.res[i].data[0].hand.forEach(function(card) {
					cardsP1.push(card.uid);
				});	
				current = {type:GameEvent.DISTRIBUTION,data:cardsP1};
				sanity.push(current);
				break;
			case GameEvent.MULIGANE:
				var cards = [];
				this.res[i].data.hand.forEach(function(card) {
					cards.push(card.uid);
				});	
				current = {type:GameEvent.MULIGANE,data:cards};	
				sanity.push(current);
				break;
			case GameEvent.WHO_BEGIN:
				current = {type:GameEvent.WHO_BEGIN,data:this.res[i].data.uid};	
				sanity.push(current);
				break;
			case GameEvent.NEXT_TOKEN:
				current = {type:GameEvent.NEXT_TOKEN,data:this.res[i].data.uid};	
				sanity.push(current);
				break;
		}
	}
	//this.socket.emit('msg',this.res);
	console.log(JSON.stringify(sanity));
};

HandlerMsg.prototype.getLastSend = function() {
	return this.res;
};