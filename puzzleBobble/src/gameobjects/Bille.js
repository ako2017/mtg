/**
 * Repésente une bille
 */
class Bille extends Phaser.Sprite {

	constructor(game) {
		super(game,0,0,'bille');
		this.anchor.set(0.5,0.5);
		this.visited = false;
	}

} 