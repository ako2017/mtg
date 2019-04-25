class DeclarationAttaquantPhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.DECLARATION_ATTAQUANT);
	}

	execute() {
		var passDeclare = true;
		this.pm.game.getPlayerActif().battlefield.every(function(card, index) {
			if(card.canAttaque()) {
				passDeclare = false;
				return true;
			}
			return false;
		});
		if(passDeclare) {
			return PHASE.DECLARATION_BLOQUEUR;
		}
		return PHASE.WAIT;
	}
	
	valid(player) {
		this.pass(player);
		if (this.pm.game.checkAllPass()) {
			if(this.pm.game.getPlayerActif().attaquants.length>0) {
				this.pm.game.nextToken();
				return PHASE.DECLARATION_BLOQUEUR;
			}
			else {
				return PHASE.FIN;	
			}
		}
		return PHASE.WAIT;
	}
	
	end() {
	}

	isAuthorized(action, data) {
		if(this.pm.game.stack.needCible()) 
			return false;
		if('poseCard' == action) {
			if(this.pm.game.isPlayerWithToken(data.player)) {
				if(data.card.type == TypeCard.EPHEMERE || data.card.type == TypeCard.CAPACITY && data.player.canPoseCard(data.card)) {
					return true;
				}
			}
		}
		else if('valid' == action) {
			if(this.pm.game.isPlayerWithToken(data.player))
				return true;
		}
		else if('declarationAttaquant' == action) {
			if(this.pm.game.isPlayerActif(data.player))
				return true;
		}
		
		return false;
	}

}