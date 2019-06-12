mainMenuState = {	
  	create: function(){
		var video = this.game.add.video('video');
		var sprite = video.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.5, 0.5);
		video.play(true);

		this.game.add.sprite(0, 0, 'logo');
		this.style = { font: '30px Arial Black',fill: '#fff',strokeThickness: 4, boundsAlignH: "center", boundsAlignV: "middle" };
		var validBtn = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY-50, 'blueBtn',function(){this.game.state.start("Game");},this);
		var text = this.game.add.text(0,0, "SOLO", this.style);
		text.anchor.setTo(0.5,0.5);
		validBtn.addChild(text);
		validBtn.anchor.setTo(0.5,0.5);
		validBtn.x = this.game.width/2;
		var creationDeckBtn = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 50, 'blueBtn',function(){},this);
		text = this.game.add.text(0,0, "DECKS", this.style);
		text.anchor.setTo(0.5,0.5);
		creationDeckBtn.addChild(text);
		creationDeckBtn.anchor.setTo(0.5,0.5);
		creationDeckBtn.x = this.game.width/2;
		
		/*var password = this.game.add.inputField(400, 90, {
		    font: '18px Arial',
		    fill: '#212121',
		    fontWeight: 'bold',
		    width: 150,
		    padding: 8,
		    borderWidth: 1,
		    borderColor: '#000',
		    borderRadius: 6,
		    placeHolder: 'Password',
		    type: PhaserInput.InputType.password
		});
		
		/*this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.pageAlignHorizontally = true;*/
		
	}
}