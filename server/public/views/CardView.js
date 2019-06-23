/**
 * Repésente l'aspect visuel d'une carte
 */
class CardView extends Phaser.Sprite {

	constructor(game, cardData, uid, gameView) {
		super(game);
		this.uid = uid;
		this.gameView = gameView;
		this.isEngaged = false;
		this.tween = null;
		this.init(cardData);
	}

	init(cardData) {
		this.back = this.addChild(this.game.make.sprite(0, 0, 'back'));
		this.front = this.addChild(this.game.make.sprite(0, 0, cardData.extension + '#' + cardData.numero));
		this.front.anchor.setTo(0.5);
		this.back.anchor.setTo(0.5);
		this.type = cardData.type;
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

	isType(type) {
		return this.type == type;
	}

	reset() {
		if(this.gameView.cardSelected.contains(this)) {
			this.gameView.cardSelected.removeByValue(this);
		}
		if(this.tween) {
			this.tween.stop()
		}
	}

	/**
	 * Lors du click sur une carte on affiche le menu des actions possibles 
	 * ou on le cache si c'est une désélection
	 * @param {CardView} cardView la carte cliquée
	 */
	onClick() {
		if(this.gameView.cardSelected.contains(this)) {
			this.gameView.cardSelected.removeByValue(this);
			this.tween.stop();
			return;
		}
		else {
			this.gameView.cardSelected.push(this);
			this.select();
		}

		/*
		if(oldCardSelected == this) {
			//this.gameView.hideActionCard();
		}
		else {
			//this.gameView.showActionCard(this);
		}*/
	}

	select() {
		this.tween = this.game.add.tween(this.scale).to({x: 0.5,y:0.5},1000,Phaser.Easing.Linear.None,true,0,-1);
		this.tween.yoyo(true);
	}

	onOver() {
		this.scale.setTo(0.8, 0.8);
	}

	onOut() {
		this.scale.setTo(0.5, 0.5)
	}

} 