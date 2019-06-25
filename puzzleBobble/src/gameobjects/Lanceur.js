/**
 * Repésente le lanceur de billes
 */
class Lanceur extends Phaser.Sprite {

	constructor(game) {
		super(game,0,0,"lanceur");
		this.anchor.set(0.5,1);
		this.fleche = game.make.sprite(0, 0, 'fleche');
		this.fleche.anchor.set(0,0.5);
		this.fleche.angle=-90;
		this.addChild(this.fleche);

	}

	moveLeft() {
		if(this.fleche.angle < -180) return;
		this.fleche.angle--;
	}

	moveRight() {
		if(this.fleche.angle > 0) return;
		this.fleche.angle++;
	}

	fire() {
		let x = this.x + Math.cos(this.fleche.rotation)*48;
		let y = this.y + Math.sin(this.fleche.rotation)*48;
		var bille = new Bille(this.game);
		bille.x=x;
		bille.y=y;
		this.game.physics.arcade.enable(bille);
		bille.body.collideWorldBounds = true;
		bille.checkWorldBounds = true;
		bille.body.bounce.set(1);
		bille.body.setCircle(16);
		bille.body.velocity.x = Math.cos(this.fleche.rotation)*400;
		bille.body.velocity.y = Math.sin(this.fleche.rotation)*400;
		this.game.physics.arcade.enable(bille);
		return bille;
	}

} 