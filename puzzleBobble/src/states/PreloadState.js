class PreloadState {
	constructor() {
	}

	preload(){ 
		this.game.load.image('back', 'assets/back.png');
	}

  	create(){
		this.game.state.start("MainMenu");
	}
}