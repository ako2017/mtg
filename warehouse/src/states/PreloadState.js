class PreloadState {
	constructor() {
	}

	preload(){
		this.game.load.image('billered', 'assets/images/billered.png');
		this.game.load.image('billegreen', 'assets/images/billegreen.png'); 
		this.game.load.image('billeblue', 'assets/images/billeblue.png');
		this.game.load.image('line', 'assets/images/line.png');
		this.game.load.image('input', 'assets/images/input.png');
		this.game.load.image('output', 'assets/images/output.png');
	}

  	create(){
		this.game.state.start("MainMenu");
	}
}