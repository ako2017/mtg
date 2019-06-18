const PHASE = require('../Constantes').PHASE;
const GameEvent = require('../Constantes').GameEvent;
const AbstractPhase = require('./AbstractPhase');

/**
 * Représente la phase de DISTRIBUTION du jeu
 * Dans celle-ci nous distribuons 7 cartes aux joueurs, il leur est possible de faire un muligane
 * si leur main ne convient pas
 */
class DistributionPhase extends AbstractPhase {
	constructor(pm) {
		super(pm,PHASE.DISTRIBUTION);
	}

	execute() {
		console.log("distribution");
		var players = this.game.getPlayers();
		for (var i = 0; i < players.length; i++) {
			var player = players[i];
			for (var j = 0; j < 7; j++) {
				var card = player.deck.pop();
				player.hand.push(card);
			}
		}
		sendEvent(GameEvent.DISTRIBUTION, players, this.game);
		return PHASE.WAIT;
	}
	
	valid(player) {
		player.doneDistrib = true;
		sendEvent(GameEvent.MULIGANE_VALID, player, this.game);
		var players = this.game.getPlayers();
		for (var i = 0; i < players.length; i++) {
			if (!players[i].doneDistrib) {
				return PHASE.WAIT;
			}
		}
		return PHASE.WHO_BEGINS;
	}
	
	end() {
	}

	isAuthorized(action, data) {
		if('muligane' == action) {
			if(data.player.canMuligane()) {
				return true;
			}
		}
		else if('valid' == action) {
			if(!data.player.doneDistrib) {
				return true;
			}
		}
		return false;
	}

}

module.exports = DistributionPhase;