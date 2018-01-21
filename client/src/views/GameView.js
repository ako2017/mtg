GameView = function (game, gameModel, controller) {
	Phaser.Group.call(this, game);
	this.gameModel = gameModel;
	this.playersView = [];
	this.init(gameModel);
	this.initGui();
};

GameView.prototype = Object.create(Phaser.Group.prototype);
GameView.prototype.constructor = GameView;

GameView.prototype.init = function(gameModel) {
	this.back = this.game.make.sprite(0, 0, 'fond');
	this.back.scale.set(0.5, 0.5);
	this.addChild(this.back);
	this.gameModel = gameModel;
	this.initPlayers(gameModel.players);
	gameModel.pm.addObserver(this);
};

GameView.prototype.initPlayers = function(players) {
	for(var i=0;i<players.length;i++) {
		this.playersView[players[i].name] = {hand:[]};
		var isMe = players[i].name == "pau";
		for(var j=0;j<players[i].deck.length;j++) {
			var card = players[i].deck[j];
			var cardView = new CardView(this.game, card);
			if(isMe) {
				cardView.y=this.game.world.centerY +100;
			}
			else {
				cardView.y=this.game.world.centerY -300;
			}
			this.addChild(cardView);		
			card.addObserver(this);
		}
		players[i].addObserver(this);
	}	
};

GameView.prototype.distributionAnim = function(player) {
	var isMe = player.name == "pau";
	var cards = player.hand;
	for(var j=0;j<cards.length;j++) {
		var cardView = cards[j].view;
		this.playersView[player.name].hand.push(cardView);
		var posX = 100 + j*80;
		var posY = this.game.world.centerY;
		if(isMe) {
			posY -= 50;
		}
		else{posY -= 150;}
		cardView.show(true);
		this.game.add.tween(cardView).to({x: posX,y:posY},1000,Phaser.Easing.Linear.None,true);
	}	
};

GameView.prototype.initGui = function() {
	for(var i=0;i<2;i++) {
		this.gui(this.gameModel.players[i]);	
		var test = $('<div></div>');
		$("#gui").before(test);
	}
	var test = $('<div>phase</div>').attr('id','phase');
	$("#gui").before(test);
	var test = $('<div>error</div>').attr('id','error');
	$("#gui").before(test);
}

GameView.prototype.gui = function(player) {
    var gameModel = this.gameModel;
    var playersView = this.playersView;
	var test = $('<button>muligane</button>').click(function () {
		player.muligane();
    }).attr('id','m_'+player.name);
    $("#gui").before(test);
	var test = $('<button>pose</button>').click(function () {
		var selected = null;
		$.each(playersView[player.name].hand, function( index, value ) {
			  if(value.isSelected) {
				  selected = value;
				  return false;
			  }
			});
		player.poseCard(selected.cardModel,gameModel.stack);
    }).attr('id','p_'+player.name);
    $("#gui").before(test);
    test = $('<button>valid</button>').click(function () {
        gameModel.valid(player);
    }).attr('id','v_'+player.name);
    $("#gui").before(test);
}

GameView.prototype.muliganeAnim = function(player) {
	var isMe = player.name == "pau";
	var posY;
	if(isMe) {
		posY=this.game.world.centerY +100;
	}
	else {
		posY=this.game.world.centerY -300;
	}
	for(var i=0;i<this.playersView[player.name].hand.length;i++) {
		this.game.add.tween(this.playersView[player.name].hand[i]).to({x: 0, y:posY},1000,Phaser.Easing.Linear.None,true);
		this.playersView[player.name].hand[i].show(false);
	}	
	setTimeout(function(player){
		var isMe = player.name == "pau";
		var y = this.game.world.centerY;
		y += isMe?50:-150;
		for(var i=0;i<player.hand.length;i++) {
			this.game.add.tween(player.hand[i].view).to({x: 100 + i*80, y:y},1000,Phaser.Easing.Linear.None,true);
			player.hand[i].view.show(true);
		}
		}.bind(this,player), 2000);
};



GameView.prototype.onReceive = function(event) {
	switch(event.type) {
		case GameEvent.ERROR:
			$('#error').text(event.data);
		break;	
		case GameEvent.CHANGE_PHASE:
			$('#phase').text(event.data);
		break;
		case GameEvent.DISTRIBUTION:
			this.distributionAnim(event.data);
			break;
		case GameEvent.MULIGANE:
			this.muliganeAnim(event.data.player);
			break;
		case GameEvent.WHO_BEGIN:
			var cards = this.gameModel.getPlayerActif().hand;
			for(var i=0;i<cards.length;i++) {
				var cardView = cards[i].view;
				cardView.inputEnabled = true;
				cardView.events.onInputUp.add(cardView.onClick, cardView);
			}		
			break;
		case GameEvent.DEGAGEMENT:
			break;
		case GameEvent.POSE_CARD:
			break;
/*		case GameEvent.STACK_CARD:
			this.stackCardAnim(event.data.card);
			event.data.player.observers[0].hand.removeByValue(event.data.card.observers[0]);
			break;
		case GameEvent.ENTER_BATTLEFIELD:
			this.enterBattlefieldAnim(event.data.card.observers[0]);
			break;
		case GameEvent.RETIRER_CARD_OK:
			var playerView = this.getPlayerByName(event.data.player.name);
			var cards = event.data.cards;
			for(var i=0;i<cards.length;i++) {
				playerView.hand.removeByValue(cards[i].observers[0]);
				this.game.add.tween(cards[i].observers[0]).to({x: 700},2000,Phaser.Easing.Linear.None,true);
			}
			break;
		*/
	}
};