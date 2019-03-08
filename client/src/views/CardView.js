/**
 * Repésente l'aspect visuel d'une carte
 */
class CardView extends Phaser.Sprite {

	constructor(game, cardData, uid, gameView) {
		super(game);
		this.isSelected = false;
		this.uid = uid;
		this.gameView = gameView;
		this.init(cardData);
	}

	
	init(cardData) {
		this.back = this.addChild(this.game.make.sprite(0, 0, 'back'));
		this.front = this.addChild(this.game.make.sprite(0, 0, cardData.extension + '#' + cardData.numero));
		this.front.anchor.setTo(0.5);
		this.back.anchor.setTo(0.5);
		this.show(false);
		this.scale.set(0.5, 0.5);
	}

	show(isVisible) {
		this.front.visible = isVisible;
		this.back.visible = !isVisible;
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
	onClick() {
		this.gameView.unselectAllCards(this.owner.hand);
		this.isSelected = !this.isSelected;
		if(!this.isSelected) {
			this.gameView.hideActionCard();
		}
		else {
			this.gameView.showActionCard(this);
		}
	}

	onOver() {
		this.scale.setTo(0.8, 0.8);
	}

	onOut() {
		this.scale.setTo(0.5, 0.5)
	}

} 