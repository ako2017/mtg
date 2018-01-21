DistributionPhase = function(pm) {
	this.pm=pm;
};

DistributionPhase.prototype.execute = function() {
	for (var i = 0; i < this.pm.game.players.length; i++) {
		var player = this.pm.game.players[i];
		for (var j = 0; j < 7; j++) {
			var card = player.deck.pop();
			player.hand.push(card);
		}
	}
	var event = {};
	event.type = GameEvent.DISTRIBUTION;
	for(var i=0;i<this.pm.game.players.length;i++) {
		event.data = this.pm.game.players[i];
		this.pm.game.players[i].notify(event);
	} 
	return PHASE.WAIT;
};

DistributionPhase.prototype.valid = function(player) {
	var event = {};
	player.doneDistrib = true;
	for (var i = 0; i < this.pm.game.players.length; i++) {
		if (!this.pm.game.players[i].doneDistrib) {
			return false;
		}
	}
	this.pm._next = PHASE.WHO_BEGINS;
	return true;
};

DistributionPhase.prototype.end = function() {
};