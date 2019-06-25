/**
 * Repésente le lanceur de billes
 */
class Lanceur extends Phaser.Sprite {

	constructor(game) {
		super(game,0,0,"lanceur");
		this.anchor.set(0.5,1);
		this.fleche = game.make.sprite(0, 0, 'fleche');
		this.fleche.anchor.set(0.5,1);
		this.addChild(this.fleche);

	}

	moveLeft() {
		if(this.fleche.angle < -90) return;
		this.fleche.angle--;
		console.log(this.fleche.angle+'r:'+this.fleche.rotation);
	}

	moveRight() {
		if(this.fleche.angle > 90) return;
		this.fleche.angle++;
		console.log(this.fleche.angle+'r:'+this.fleche.rotation);
	}

	fire() {
		return this.game.add.sprite(234, 32, 'bille');
	}

} 