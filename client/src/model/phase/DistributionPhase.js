DistributionPhase = function(pm) {
	this.pm=pm;
	this.phaseId = PHASE.DISTRIBUTION;
};

DistributionPhase.prototype.execute = function() {
	for (var i = 0; i < this.pm.game.players.length; i++) {
		var player = this.pm.game.players[i];
		for (var j = 0; j < 7; j++) {
			var card = player.deck.pop();
			player.hand.push(card);
		}
	}
	sendEvent(GameEvent.DISTRIBUTION,this.pm.game.players,this.pm.game);
	return PHASE.WAIT;
};

DistributionPhase.prototype.valid = function(player) {
	player.doneDistrib = true;
	for (var i = 0; i < this.pm.game.players.length; i++) {
		if (!this.pm.game.players[i].doneDistrib) {
			return PHASE.WAIT;
		}
	}
	return PHASE.WHO_BEGINS;
};

DistributionPhase.prototype.end = function() {
};