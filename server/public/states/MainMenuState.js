mainMenuState = {	
  	create: function(){
		var video = this.game.add.video('video');
		var sprite = video.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.5, 0.5);
		video.play(true);

		this.game.add.sprite(0, 0, 'logo');
	
		this.style = { font: '16px Arial Black',fill: '#fff',strokeThickness: 4, boundsAlignH: "center", boundsAlignV: "middle" };
		this.name = this.game.add.text(0,0, "PSEUDO: ", this.style);
		var validBtn = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY-45, 'blueBtn',function(){this.game.state.start("Game");},this);
		var text = this.game.add.text(0,0, "SOLO", this.style);
		text.anchor.setTo(0.5,0.5);
		validBtn.addChild(text);
		validBtn.anchor.setTo(0.5,0.5);
		validBtn.x = this.game.width/2;

		var creationDeckBtn = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 30, 'blueBtn',function(){$("#parties").hide()},this);
		text = this.game.add.text(0,0, "CREER PARTIE", this.style);
		text.anchor.setTo(0.5,0.5);
		creationDeckBtn.addChild(text);
		creationDeckBtn.anchor.setTo(0.5,0.5);
		creationDeckBtn.x = this.game.width/2;

		creationDeckBtn = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 105, 'blueBtn',function(){$("#parties").show()},this);
		text = this.game.add.text(0,0, "REJOINDRE PARTIE", this.style);
		text.anchor.setTo(0.5,0.5);
		creationDeckBtn.addChild(text);
		creationDeckBtn.anchor.setTo(0.5,0.5);
		creationDeckBtn.x = this.game.width/2;



		creationDeckBtn = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 180, 'blueBtn',function(){},this);
		text = this.game.add.text(0,0, "DECKS", this.style);
		text.anchor.setTo(0.5,0.5);
		creationDeckBtn.addChild(text);
		creationDeckBtn.anchor.setTo(0.5,0.5);
		creationDeckBtn.x = this.game.width/2;

		
		
	/*	this.pseudo = this.game.add.inputField(400, 90, {
		    font: '18px Arial',
		    fill: '#212121',
		    fontWeight: 'bold',
		    width: 150,
		    padding: 8,
		    borderWidth: 1,
		    borderColor: '#000',
		    borderRadius: 6,
		    placeHolder: 'votre pseudo',
		    type: PhaserInput.InputType.text
		});

		creationDeckBtn = this.game.add.button(630,105, 'blueBtn',function(){this.name.text = 'PSEUDO: '+this.pseudo.value},this);
		text = this.game.add.text(0,0, "VALID", this.style);
		text.anchor.setTo(0.5,0.5);
		creationDeckBtn.addChild(text);
		creationDeckBtn.anchor.setTo(0.5,0.5);
		creationDeckBtn.scale.setTo(0.5,0.5);
		*/
		/*this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.pageAlignHorizontally = true;*/
		
	}
}