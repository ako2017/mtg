class GameState {
	constructor() {

	}

	create() {

	}

	update() {
	
	}

	initPhysicSystem() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 100;
	}

}