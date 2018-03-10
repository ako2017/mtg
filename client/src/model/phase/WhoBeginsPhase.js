WhoBeginsPhase = function(pm) {
	this.pm = pm;
};

WhoBeginsPhase.prototype.execute = function() {
	var event = {};
	this.pm.game.playerActif = Math.floor((Math.random() * 10))%2;
	this.pm.game.token = this.pm.game.playerActif;
	this.pm.game.getPlayerActif().canPioche = false;
	event.type = GameEvent.WHO_BEGIN;
	event.data = this.pm.game.getPlayerActif();
	for(var i=0;i<this.pm.game.players.length;i++) {
		this.pm.game.players[i].notify(event);
	} 
	setTimeout(this.next.bind(this), Duration.WHO_BEGIN);
	return PHASE.WAIT;
};

WhoBeginsPhase.prototype.valid = function(player, game) {
	return false;
};

WhoBeginsPhase.prototype.next = function() {
	this.pm._next = PHASE.DEGAGEMENT;
	this.pm.next();
};

WhoBeginsPhase.prototype.end = function() {
};