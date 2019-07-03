class MainMenuState {
	constructor() {
	}
	
  	create(){

		//this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.pageAlignHorizontally = true;

		this.game.state.start("Game");
	}
}