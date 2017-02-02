//  Here is a custom game object
BoardView = function (game, board, controller, name) {
	Phaser.Group.call(this, game);
	this.players = [];
	this.token = null;
	this.myName = name;
	this.myId = null;
	this.model = board;
	this.controller = controller;
	this.init(board);
};

BoardView.prototype = Object.create(Phaser.Group.prototype);
BoardView.prototype.constructor = BoardView;

BoardView.prototype.init = function(board) {
	this.initBtn();
	this.initPlayers(board.players);
	this.style = { font: "20px Arial", fill: "#f00"};
	this.playerActifLabel= this.game.add.text(0, 0, "JOUEUR ACTIF: ", this.style);
	this.phaseLabel= this.game.add.text(0, 20, "PHASE: ", this.style);
	this.etapeLabel= this.game.add.text(0, 40, "ETAPE: ", this.style);
};

BoardView.prototype.initBtn = function() {
	this.style = { font: "30px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
	this.validBtn= this.game.add.text(this.game.world.centerX + 200, this.game.world.centerY, "PASSER", this.style);
	this.muliganeBtn= this.game.add.text(this.game.world.centerX, this.game.world.centerY, "MULIGANE", this.style);
	this.muliganeBtn.inputEnabled = true;
	this.validBtn.inputEnabled = true;
	this.validBtn.events.onInputUp.add(function(){this.controller.endOfTurn(this)}, this);
	this.muliganeBtn.events.onInputUp.add(function(){this.controller.muligane(this)}, this);
};

BoardView.prototype.initPlayers = function(players) {
	for(var i=0;i<players.length;i++) {
		if(players[i].name == "pau"){
			this.myId = i;
		}
	}
	for(var i=0;i<players.length;i++) {
		var newPlayer = new PlayerView(this.game);
		for(var j=0;j<players[i].deck.length;j++) {
			var card = players[i].deck[j];
			var newCard = new CardView(this.game, card, this.model, this,newPlayer);
			if(i != this.myId) {
				newCard.y=this.game.world.centerY -300+j;
			}
			else {
				newCard.y=this.game.world.centerY +100+j;
			}
			newCard.x=600+j;
			this.addChild(newCard);
			newPlayer.deck.push(newCard);
			newPlayer.name = players[i].name;
			newPlayer.model = players[i];
			
			card.addObserver(newCard);
			
		}
		players[i].addObserver(newPlayer);
		this.players.push(newPlayer);
	}	
};
 
BoardView.prototype.update = function() {
	this.phaseLabel.setText("PHASE: " + getPhaseName(this.model.phase));
	this.etapeLabel.setText("ETAPE: " + getEtapeName(this.model.etape));
	if(this.model.phase == Phase.COMBAT)
		this.validBtn.setText("PASSER");
	if(this.model.phase == Phase.PRINCIPALE) {
		if(this.players[1].hasSelectedCards())
			this.validBtn.setText("POSER");
		else
			this.validBtn.setText("PASSER");
	}
	if(this.model.sousEtape == SousEtape.RETIRER_CARD) {
		this.validBtn.setText("RETIRER");
	}
};

BoardView.prototype.distributionAnim = function(players) {
	for(var i=0;i<players.length;i++) {
		var cards = players[i].hand;
		for(var j=0;j<cards.length;j++) {
			var cardView = cards[j].observers[0];
			
			var posX = 100 + j*80;
			var posY = 0;
			if(i == 1) {
				posY = 430;
			}	
			this.game.add.tween(cardView).to({x: posX,y:posY},2000,Phaser.Easing.Linear.None,true);
			if(i == 1) {
				cardView.inputEnabled = true;
				cardView.events.onInputUp.add(cardView.onClick, cardView);
				cardView.show(true);
			}
			this.players[i].hand.push(cardView);
		}		
	}
};

BoardView.prototype.checkCardSelected = function(idPlayer) {
	for(var i=0;i<this.players[idPlayer].hand.length;i++) {
		var card = this.players[idPlayer].hand[i];
		if(card.isSelected) return true;
	}
	return false;
};

BoardView.prototype.getPlayerByName = function(name) {
	for(var i =0;i<this.players.length;i++) {
		if(this.players[i].name == name) {
			return this.players[i];
		}
	}
	return null;
}

BoardView.prototype.muliganeAnim = function(player, cards) {
	var playerView = this.getPlayerByName(player.name);
	for(var i=0;i<playerView.hand.length;i++) {
		this.game.add.tween(playerView.hand[i]).to({x: 700},2000,Phaser.Easing.Linear.None,true);
		playerView.hand[i].show(false);
	}
	playerView.hand = [];
	for(var i=0;i<cards.length;i++) {
		playerView.hand.push(cards[i].observers[0]);
	}
	
	setTimeout(function(cards,name){
		for(var i=0;i<cards.length;i++) {
		this.game.add.tween(cards[i].observers[0]).to({x: 100 + i*80},2000,Phaser.Easing.Linear.None,true);
		if(name == this.myName)
			cards[i].observers[0].show(true);
	}}.bind(this,cards,player.name), 3000);
};

BoardView.prototype.onReceive = function(event) {
	switch(event.type) {
		case GameEvent.DISTRIBUTION:
			this.distributionAnim(event.data);
			break;
		case GameEvent.MULIGANE:
			this.muliganeAnim(event.data.player, event.data.cards);
			break;
		case GameEvent.WHO_BEGIN:
			this.playerActifLabel.setText("JOUEUR ACTIF:" + this.players[event.data].name);
			this.token = event.data;
			var cards = this.players[this.token].hand;
			for(var i=0;i<cards.length;i++) {
				var cardView = cards[i];
				cardView.inputEnabled = true;
				cardView.events.onInputUp.add(cardView.onClick, cardView);
			}		
			break;
		case GameEvent.RETIRER_CARD:
			break;
		case GameEvent.RETIRER_CARD_OK:
			var playerView = this.getPlayerByName(event.data.player.name);
			var cards = event.data.cards;
			for(var i=0;i<cards.length;i++) {
				playerView.hand.removeByValue(cards[i].observers[0]);
				this.game.add.tween(cards[i].observers[0]).to({x: 700},2000,Phaser.Easing.Linear.None,true);
				
			}
			break;
		case GameEvent.ERROR:
			alert(event.data);
			break;
	}
};