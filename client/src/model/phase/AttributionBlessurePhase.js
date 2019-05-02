class AttributionBlessurePhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.ATTRIBUTION_BLESSURE);
	}

	execute() {
		var game = this.pm.game;
		this.pm.game.getPlayerActif().attaquants.forEach(function(card) {
			card.attack(game.getPlayerNonActif());
		});
		var pm = this.pm;
		
		this.pm.game.getPlayerActif().attaquants.forEach(function(card) {
			if(card.enduranceCpt<=0) {
				card.gotoCemetery();
				pm.game.getPlayerActif().battlefield.removeByValue(card);
			}
			if(card.blockedBy != null) {
				if(card.blockedBy.enduranceCpt<=0) {
					card.blockedBy.gotoCemetery();
					pm.game.getPlayerNonActif().battlefield.removeByValue(card.blockedBy);	
				}	
			}
		});
	
		return  PHASE.PRINCIPALE;
	}
	
	valid(player) {
		return PHASE.WAIT;
	}
	
	end() {
		sendEvent(GameEvent.RESTAURE_BLOQUEURS,this.pm.game.getPlayerNonActif().name,this.pm.game);
	}

}