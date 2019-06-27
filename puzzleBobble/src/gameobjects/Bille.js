/**
 * Repésente une bille
 */
class Bille extends Phaser.Sprite {

	constructor(game, image, type) {
		super(game,0,0,image);
		this.anchor.set(0.5,0.5);
		this.type = type;
		this.visited = false;
		this.posX=0;
		this.posY=0;
	}

} 