/**
 * Classe comprenant l'accès à toutes les méthodes nécessaires pour jouer une partie
 */
class GameService {

	createGame()  {
		var game = new Game();
		game.handler = new HandlerMsg();
		game.addObserver(game.handler)
		return game;
	}

	/**
	 * Ajoute un joueur à la partie
	 * @param {*} game 
	 * @param {*} player 
	 */
	addPlayer(game, player) {
		if(game.isFull()) return null;
		game.addPlayer(player);
		return player;
	}

	/**
	 * Effectue un muligane si possible
	 * @param {*} game le contexte du jeu
	 * @param {*} player le joueur voulant faire le muligane
	 */
	muligane(game, player) {
		if(AccessHelper.canMuligane(player)) {
			player.muligane();
		}
	}

	/**
	 * Retire une carte de la main du joueur si possible
	 * @param {*} game le contexte du jeu
	 * @param {*} player le joueur voulant retirer une carte
	 * @param {*} card  la carte à retirer
	 */
	retirerCard(game, player, card) {
		if(AccessHelper.canRetirerCard(game, player, card)) {
			player.retirerCard(card);
		}
	}
	
	/**
	 * 
	 * @param {*} game 
	 * @param {*} player 
	 */
	valid(game, player) {
		if(AccessHelper.canValid(player,game)) {
			game.pm.valid(player);
		}
	}
	
	/**
	 * Pose une carte en jeu. 
	 * Si une cible est nécessaire un événement est généré 
	 * @param {*} game le contexte du jeu
	 * @param {*} player le joueur voulant poser une carte
	 * @param {*} card la carte que l'on souhaire poser
	 */
	poseCard(game, player, card) {
		if(AccessHelper.canPoseCard(player, game, card, game.stack)) {
			player.payMana(card.mana);
			player.poseCard(card, game.stack);
			if (game.stack.needCible()) {
				game.state = State.NEED_CIBLE;
			}
		}
	}

}







