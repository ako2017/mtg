mainMenuState = function(game){}
var board=null; 
mainMenuState.prototype = {	
  	create: function(){
		var video = this.game.add.video('video');
		var sprite = video.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.5, 0.5);
		video.play(true);

		//this.game.add.sprite(0, 0, 'titleBg');
		this.game.add.sprite(0, 0, 'logo');
		this.style = { font: "30px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
		this.validBtn= this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY-50, "PARTIE SOLO", this.style);
		this.validBtn.inputEnabled = true;
		this.validBtn.events.onInputUp.add(this.onNewLocalGame, this);
		
		emitter = this.game.add.emitter(this.game.world.centerX, 620, 200);

		emitter.makeParticles('corona');

		emitter.setRotation(0, 0);
		emitter.setScale(0.5, 1);
		emitter.gravity = -100;

		//	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
		//	The 5000 value is the lifespan of each particle before it's killed
		emitter.start(false, 5000, 100);		
		
		this.game.input.onDown.add(this.gofull, this);
	},
	onNewLocalGame: function(data) {
		board = new Board();
		board.addPlayer(this.createPlayer('lala'));
		var player = this.createPlayer('pau');
		player.isMe = true;
		board.addPlayer(player);
		this.game.state.start("Game");
	},
	showMessage: function(msg) {
		text.setText(msg);
	},
	createPlayer: function(name) {
		var player = new Player();
		var cardService = new CardService();
		var cards = cardService.getAvailableCards();
		var nbCards = cards.length;
		player.name = name;
		for(var i=0;i<60;i++) {
			var card = new Card(player);
			card.init(JSON.parse(cards[Math.floor((Math.random() * 300))%nbCards].data));
			player.deck.push(card);
		}
		return player;
	},
	gofull:function() {
        //this.game.scale.startFullScreen(false);
	}
}