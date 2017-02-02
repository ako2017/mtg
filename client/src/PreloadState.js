var preloadState = function(game){}
 
preloadState.prototype = {
	preload: function(){ 
		var cardService = new CardService();
		var cards = cardService.getAvailableCards();
		for(var i=0;i<cards.length;i++) {
			var card = JSON.parse(cards[i].data);
			this.game.load.image(card.extension + '#' + card.numero, 'assets/extensions/'+card.extension+'/'+addzeros(card.numero,3)+'.jpg');
		}
		this.game.load.image('back', 'assets/back.png');
		this.game.load.image('cross', 'assets/cross.jpg');
		this.game.load.image('titleBg', 'assets/bg.jpg');
		this.game.load.image('corona', 'assets/blue.png');
		this.game.load.image('logo', 'assets/logo-magic.png');
		this.game.load.video('video', 'assets/defkp_EMN_Header_41.mp4');

	},
  	create: function(){
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.state.start("MainMenu");
	}
}