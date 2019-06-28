class PreloadState {
	constructor() {
	}

	preload(){
		this.game.load.image('billered', 'assets/images/billered.png');
		this.game.load.image('billegreen', 'assets/images/billegreen.png'); 
		this.game.load.image('billeblue', 'assets/images/billeblue.png');
		this.game.load.image('lanceur', 'assets/images/lanceur.png');
		this.game.load.image('fleche', 'assets/images/fleche.png');
		this.game.load.shader('bacteria', 'assets/shaders/bacteria.frag');
		this.game.load.shader('blueDots', 'assets/shaders/blue-dots.frag');
	}

  	create(){
		this.game.state.start("MainMenu");
	}
}