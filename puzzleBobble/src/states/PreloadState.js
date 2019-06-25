class PreloadState {
	constructor() {
	}

	preload(){ 
		this.game.load.image('bille', 'assets/images/bille.png');
		this.game.load.image('lanceur', 'assets/images/lanceur.png');
		this.game.load.image('fleche', 'assets/images/fleche.png');
	}

  	create(){
		this.game.state.start("MainMenu");
	}
}