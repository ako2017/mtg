mainMenuState = {	
  	create: function(){
		var video = this.game.add.video('video');
		var sprite = video.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.5, 0.5);
		video.play(true);

		this.game.add.sprite(0, 0, 'logo');
		this.style = { font: '30px Arial Black',fill: '#fff',strokeThickness: 4, boundsAlignH: "center", boundsAlignV: "middle" };
		var validBtn = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY-50, this.game.cache.getBitmapData('button'),function(){this.game.state.start("Game");},this);
		validBtn.addChild(this.game.add.text(0,0, "PARTIE SOLO", this.style));
	}
}