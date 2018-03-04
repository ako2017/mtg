GameView = function (game) {
	Phaser.Group.call(this, game);
	this.gameModel = null;
	this.controller = null;
	this.playersView = [];
};

GameView.prototype = Object.create(Phaser.Group.prototype);
GameView.prototype.constructor = GameView;

GameView.prototype.init = function() {
	this.back = this.game.make.sprite(0, 0, 'fond');
	this.back.scale.set(0.5, 0.5);
	this.addChild(this.back);
	this.initPlayers(this.gameModel.players);
	this.registerObserver();
};

GameView.prototype.registerObserver = function() {
	this.gameModel.pm.addObserver(this);
	this.gameModel.stack.addObserver(this);
};

GameView.prototype.initPlayers = function(players) {
	for(var i=0;i<players.length;i++) {
		this.playersView[players[i].name] = {hand:[],terrains:[],battlefield:[]};
		var isMe = players[i].name == "pau";
		players[i].addObserver(this);
		for(var j=0;j<players[i].deck.length;j++) {
			var card = players[i].deck[j];
			var cardView = new CardView(this.game, card);
			cardView.owner = this.playersView[players[i].name];
			cardView.playerModel = players[i];
			if(isMe) {
				cardView.y=this.game.world.centerY +100;
			}
			else {
				cardView.y=this.game.world.centerY -300;
			}
			this.addChild(cardView);
			card.addObserver(this);
		}
	}	
};

GameView.prototype.distributionAnim = function(player) {
	var isMe = player.name == "pau";
	var cards = player.hand;
	for(var j=0;j<cards.length;j++) {
		var cardView = cards[j].view;
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

GameView.prototype.muliganeAnim = function(player) {
	var isMe = player.name == "pau";
	var posY;
	if(isMe) {
		posY=this.game.world.centerY +100;
	}
	else {
		posY=this.game.world.centerY -300;
	}
	for(var i=0;i<player.hand.length;i++) {
		this.game.add.tween(player.hand[i].view).to({x: 0, y:posY},1000,Phaser.Easing.Linear.None,true);
		player.hand[i].view.show(false);
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

GameView.prototype.moveCard = function(player) {
	var isMe = player.name == "pau";
	var posY;
	if(isMe) {
		posY=this.game.world.centerY +200;
	}
	else {
		posY=0;
	}
	for(var i=0;i<player.hand.length;i++) {
		this.game.add.tween(player.hand[i].view).to({y:posY},1000,Phaser.Easing.Linear.None,true);
	}	
};

GameView.prototype.poseTerrainAnim = function(player,card) {
	var isMe = player.name == "pau";
	var posY;
	if(isMe) {
		posY=this.game.world.centerY +100;
	}
	else {
		posY=100;
	}
	this.game.add.tween(card.view).to({y:posY},1000,Phaser.Easing.Linear.None,true);
};

GameView.prototype.stackAnim = function(card) {
	var posY = this.game.world.centerY;
	this.game.add.tween(card.view).to({y:posY,x:0},1000,Phaser.Easing.Linear.None,true);
};

GameView.prototype.enterBattlefieldAnim = function(card) {
	var posY = this.game.world.centerY;
	this.game.add.tween(card.view).to({y:posY,x:300},1000,Phaser.Easing.Linear.None,true);
};

GameView.prototype.onReceive = function(event) {
	switch(event.type) {
		case GameEvent.DISTRIBUTION:
			this.distributionAnim(event.data);
			break;
		case GameEvent.STACK_CARD:
			this.stackAnim(event.data);
			break;
		case GameEvent.ERROR:
			GUI.showError(event.data);
			break;
		case GameEvent.CHANGE_PHASE:
			GUI.showPhase(event.data);
		break;
		case GameEvent.MULIGANE:
			this.muliganeAnim(event.data.player);
			break;
		case GameEvent.WHO_BEGIN:
			this.moveCard(this.gameModel.players[0]);
			this.moveCard(this.gameModel.players[1]);
			break;
		case GameEvent.DEGAGEMENT:
			break;
		case GameEvent.POSE_TERRAIN:
			this.poseTerrainAnim(event.data.player,event.data.card);
			break;
		case GameEvent.ENTER_BATTLEFIELD:
			this.enterBattlefieldAnim(event.data);
			break;
		case GameEvent.NEXT_TOKEN:
			//this.enterBattlefieldAnim(event.data);
			break;			
	}
};