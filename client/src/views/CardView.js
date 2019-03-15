/**
 * Repésente l'aspect visuel d'une carte
 */
class CardView extends Phaser.Sprite {

	constructor(game, cardData, uid, gameView) {
		super(game);
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
		this.front.force = this.front.addChild(this.game.add.text(-50, 0, cardData.force, { font: '28px Arial Black',fill: '#fff',strokeThickness: 4 }));
		this.front.force.anchor.setTo(0.5);
		this.front.endurance = this.front.addChild(this.game.add.text(50, 0, cardData.endurance, { font: '28px Arial Black',fill: '#fff',strokeThickness: 4 }));
		this.front.endurance.anchor.setTo(0.5);
		this.scale.set(0.5, 0.5);
	}

	show(isVisible) {
		this.front.visible = isVisible;
		this.back.visible = !isVisible;
	}

	isEngaged() {
		return this.angle == 90;
	}

	isType(type) {
		return this.type == type;
	}



	/**
	 * Lors du click sur une carte on affiche le menu des actions possibles 
	 * ou on le cache si c'est une désélection
	 * @param {CardView} cardView la carte cliquée
	 */
	onClick() {
		var oldCardSelected = this.gameView.cardSelected;
		this.gameView.cardSelected = this;

		if(oldCardSelected == this) {
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