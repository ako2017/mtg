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
		this.nextBille = this.addChild(BilleFactory.create(this.game,this.game.rnd.integerInRange(0,2)));
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
		var bille = this.nextBille;
		bille.x=x;
		bille.y=y;
		this.game.physics.arcade.enable(bille);
		bille.body.collideWorldBounds = true;
		bille.checkWorldBounds = true;
		bille.body.allowGravity = false;
		bille.body.bounce.set(1);
		bille.body.setCircle(16);
		bille.body.velocity.x = Math.cos(this.fleche.rotation)*500;
		bille.body.velocity.y = Math.sin(this.fleche.rotation)*500;
		this.game.physics.arcade.enable(bille);
		this.nextBille = this.addChild(BilleFactory.create(this.game,this.game.rnd.integerInRange(0,2)));
		return bille;
	}

} 