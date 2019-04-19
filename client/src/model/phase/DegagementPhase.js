class DegagementPhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.DEGAGEMENT);
	}

	execute() {
		var player = this.getPlayerActif();
		for(var i = 0; i < player.battlefield.length; i++) {
			player.battlefield[i].degage();
		}
		for(var i = 0; i < player.terrains.length; i++) {
			player.terrains[i].degage();
		}
		return PHASE.ENTRETIENT;
	}

	getPlayerActif() {
		return this.pm.game.getPlayerActif();
	}
	
	valid(player) {
		return PHASE.WAIT;
	}
	
	end() {
	}

}