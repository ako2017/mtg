class GameState {
	constructor() {
		this.view = null;
	}

	create() {
		this.createGameView();
	}

	createGameView() {
		this.view = new GameView(this.game);
		this.game.add.existing(this.view);
		this.onCreateCallback();
	}

}