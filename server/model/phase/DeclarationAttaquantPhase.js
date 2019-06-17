class DeclarationAttaquantPhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.DECLARATION_ATTAQUANT);
		this.hasFinishDeclarationAttaquants = false;
	}

	execute() {
		var passDeclare = true;
		this.game.getPlayerActif().battlefield.every(function(card, index) {
			if(card.canAttaque()) {
				passDeclare = false;
				return true;
			}
			return false;
		});
		if(passDeclare) {
			return PHASE.FIN;
		}
		return PHASE.WAIT;
	}
	
	valid(player) {
		if(!this.hasFinishDeclarationAttaquants) {
			this.hasFinishDeclarationAttaquants = true;
			return PHASE.WAIT;		
		}
		
		this.game.pass(player);
		if (this.game.checkAllPass()) {
			//on a des attaquants on va les bloquer
			if(this.game.getPlayerActif().attaquants.length>0) {
				this.game.nextToken();
				return PHASE.DECLARATION_BLOQUEUR;
			}
			else {
				return PHASE.FIN;	
			}
		}	
		return PHASE.WAIT;
	}
	
	end() {
		this.hasFinishDeclarationAttaquants = false;
	}

	isAuthorized(action, data) {
		if('poseCard' == action) {
			if(this.hasFinishDeclarationAttaquants && this.game.isPlayerWithToken(data.player) && (data.card.type == TypeCard.EPHEMERE || data.card.type == TypeCard.CAPACITY) && data.player.canPoseCard(data.card)) {
				return true;
			}
		}
		else if('declareAttaquant' == action) {
			if(!this.hasFinishDeclarationAttaquants && this.game.isPlayerActif(data.player) && data.player.canDeclareAttaquant(card)) {
				return true;
			}
		}
		else if('valid' == action) {
			if((this.game.isPlayerActif(data.player) && !this.hasFinishDeclarationAttaquants)
			 	|| (this.game.isPlayerWithToken(data.player) && this.hasFinishDeclarationAttaquants))
				return true;
		}
		return false;
	}

}