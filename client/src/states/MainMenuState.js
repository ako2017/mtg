mainMenuState = function(game){}
var board=null; 
mainMenuState.prototype = {	
  	create: function(){
		var video = this.game.add.video('video');
		var sprite = video.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.5, 0.5);
		video.play(true);

		this.game.add.sprite(0, 0, 'logo');
		this.style = { font: "30px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
		this.validBtn= this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY-50, "PARTIE SOLO", this.style);
		this.validBtn.inputEnabled = true;
		this.validBtn.events.onInputUp.add(this.onNewGame, this);
	},
	onNewGame: function(data) {
		this.game.state.start("Game");
	}
}