var preloadState = function(game){}
 
preloadState.prototype = {
	preload: function(){ 
		var cards = [];
		cards.push(cardCreature);
		cards.push(cardEphemere);
		cards.push(cardEphemere2);
		cards.push(island);
		for(var i=0;i<cards.length;i++) {
			this.game.load.image(cards[i].extension + '#' + cards[i].numero, 'assets/extensions/'+cards[i].extension+'/'+addzeros(cards[i].numero,3)+'.png');
		}
		this.game.load.image('back', 'assets/back.png');
		this.game.load.image('avatar1', 'assets/avatar1.jpg');
		this.game.load.image('avatar2', 'assets/avatar2.jpg');
		this.game.load.image('titleBg', 'assets/bg.jpg');
		this.game.load.image('logo', 'assets/logo-magic.png');
		this.game.load.image('fond', 'assets/fond.jpg');
		this.game.load.video('video', 'assets/defkp_EMN_Header_41.mp4');

	},
  	create: function(){
		this.game.state.start("MainMenu");
	}
}