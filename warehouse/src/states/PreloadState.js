class PreloadState {
	constructor() {
	}

	preload(){
		this.game.load.image('billered', 'assets/images/billered.png');
		this.game.load.image('billegreen', 'assets/images/billegreen.png'); 
		this.game.load.image('billeblue', 'assets/images/billeblue.png');
	}

  	create(){
		this.game.state.start("MainMenu");
	}
}