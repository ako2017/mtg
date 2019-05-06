class AttributionBlessurePhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.ATTRIBUTION_BLESSURE);
	}

	execute() {
		var game = this.game;
		this.pm.game.getPlayerActif().attaquants.forEach(function(card) {
			card.attack(game.getPlayerNonActif());
		});
		
		this.game.getPlayerActif().attaquants.forEach(function(card) {
			if(card.enduranceCpt<=0) {
				card.gotoCemetery();
				game.getPlayerActif().battlefield.removeByValue(card);
			}
			if(card.blockedBy != null) {
				if(card.blockedBy.enduranceCpt<=0) {
					card.blockedBy.gotoCemetery();
					game.getPlayerNonActif().battlefield.removeByValue(card.blockedBy);	
				}	
			}
		});
	
		return  PHASE.PRINCIPALE;
	}
	
	valid(player) {
		return PHASE.WAIT;
	}
	
	end() {
		sendEvent(GameEvent.RESTAURE_BLOQUEURS,this.game.getPlayerNonActif().name,this.game);
	}

}