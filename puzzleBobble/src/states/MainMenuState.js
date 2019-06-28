class MainMenuState {
	constructor() {
	}
	
  	create(){
	//	this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT   ;
	//	this.game.scale.pageAlignVertically = true;
	//	this.game.scale.pageAlignHorizontally = true;
		this.game.state.start("Game");
	}
}