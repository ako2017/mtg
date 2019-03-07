/**
 * Gestionnaire d'évènements de souris pour les cartes
 */
class CardMouseHandler  {

	/**
	 * 
	 * @param {GameView} game 
	 */
	constructor(game) {
		this.game = game;
	}

	/**
	 * Désélectionne les cartes de la liste cards
	 * @param {Array} cards tableau de cartes
	 */
	unselectAllCards(cards) {
		for (i = 0; i < cards.length; i++) {
			if (cards[i]!=null && cards[i].isSelected) {
				cards[i].isSelected = false;
			}
		}
	}

	/**
	 * Lors du click sur une carte on affiche le menu des actions possibles 
	 * ou on le cache si c'est une désélection
	 * @param {CardView} cardView la carte cliquée
	 */
	onClick(cardView) {
		this.unselectAllCards(cardView.owner.hand);
		cardView.isSelected = !cardView.isSelected;
		if(!cardView.isSelected) {
			this.game.hideActionCard();
		}
		else {
			this.game.showActionCard(cardView);
		}
	}

	onOver(cardView) {
		cardView.scale.setTo(0.8, 0.8);
	}

	onOut(cardView) {
		cardView.scale.setTo(0.5, 0.5)
	}
} 