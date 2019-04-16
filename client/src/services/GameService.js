/**
 * Classe comprenant l'accès à toutes les méthodes nécessaires pour jouer une partie
 */
class GameService {
	
	/**
	 * initialise une nouvelle partie
	 * @returns le jeu
	 */
	createGame()  {
		var game = new Game();
		game.handler = new HandlerMsg();
		game.addObserver(game.handler)
		return game;
	}

	/**
	 * Ajoute un joueur à la partie
	 * @param {Game} game 
	 * @param {Player} player 
	 * @returns le joueur ajouté ou null si impossible
	 */
	addPlayer(game, player) {
		if(game.isFull()) return null;
		game.addPlayer(player);
		return player;
	}

	/**
	 * Effectue un muligane si possible
	 * @param {Game} game le contexte du jeu
	 * @param {Player} player le joueur voulant faire le muligane
	 */
	muligane(game, player) {
		if(AccessHelper.canMuligane(game, player)) {
			player.muligane();
		}
	}

	/**
	 * Retire une carte de la main du joueur si possible
	 * @param {Game} game le contexte du jeu
	 * @param {Player} player le joueur voulant retirer une carte
	 * @param {Card} card  la carte à retirer
	 */
	retirerCard(game, player, card) {
		if(AccessHelper.canRetirerCard(game, player, card)) {
			player.retirerCard(card);
		}
	}
	
	/**
	 * 
	 * @param {Game} game 
	 * @param {Player} player 
	 */
	valid(game, player) {
		game.valid(player)
	}
	
	/**
	 * Pose une carte en jeu. 
	 * Si une cible est nécessaire un événement est généré 
	 * @param {Game} game le contexte du jeu
	 * @param {Player} player le joueur voulant poser une carte
	 * @param {Card} card la carte que l'on souhaire poser
	 */
	poseCard(game, player, card) {
		if(game.isAuthorized(player, game, card, game.stack)) {
			player.poseCard(card, game.stack);
			if (game.stack.needCible()) {
				game.state = State.NEED_CIBLE;
			}
		}
	}

	declareAttaquant(game, player,card) {
		if(AccessHelper.declareAttaquant(game, player, card)) {
			player.declareAttaquant(card);		
		}
	}

	/**
	 * 
	 * @param {Game} game 
	 * @param {Player} player 
	 * @param {Card} card 
	 * @param {Card} cardBlocked 
	 */
	declareBloqueur(game, player,card,cardBlocked) {
		if(AccessHelper.declareBloqueur(game, player, card, cardBlocked)) {
			player.declareBloqueur(card,cardBlocked);	
		}
	}

}