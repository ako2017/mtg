GameView = function (game) {
	Phaser.Group.call(this, game);
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
	this.game.add.text(CONFIG.pilelabel[0], CONFIG.pilelabel[1], 'PILE', { font: '14px Arial Black',fill: '#fff',strokeThickness: 4 });
	this.game.add.text(CONFIG.cemeterylabel[0][0], CONFIG.cemeterylabel[0][1], 'CEMETERY', {font: '14px Arial Black',fill: '#fff',strokeThickness: 4});
	this.phaseLabel = this.game.add.text(CONFIG.phase[0], CONFIG.phase[1], '', {font: '14px Arial Black',fill: '#fff',strokeThickness: 4});
	this.errorLabel = this.game.add.text(CONFIG.error[0], CONFIG.error[1], '', {font: '14px Arial Black',fill: '#fff',strokeThickness: 4});
	this.tokenLabel = this.game.add.image(800, 0, this.game.cache.getBitmapData('token'));
	this.actifLabel = this.game.add.image(800, 0, this.game.cache.getBitmapData('actif'));
	this.bandeau = this.game.add.image(0, 295, this.game.cache.getBitmapData('bandeau'));
	this.playerView = [];
	this.playersView[this.gameModel.players[0].name] = {hand:[],terrains:[],battlefield:[]};
	this.playersView[this.gameModel.players[1].name] = {hand:[],terrains:[],battlefield:[]};
	
	this.muligageBtn = this.game.add.button(0, 110, this.game.cache.getBitmapData('buttonsmall'), function(button){this.muligane(button.player);},this.gameModel);
	this.muligageBtn.text = this.muligageBtn.addChild(this.game.add.text(0, 0, 'muligane', {font: '16px Arial Black'}));
	this.muligageBtn.player = this.gameModel.players[0];
	
	this.validBtn = this.game.add.button(380, 270, this.game.cache.getBitmapData('buttonsmall'), function(button){this.valid(button.player);},this.gameModel);
	this.validBtn.text = this.validBtn.addChild(this.game.add.text(0, 0, 'valid', {font: '16px Arial Black'}));
	this.validBtn.player = this.gameModel.players[0];
	
	this.muligageBtn2 = this.game.add.button(0, 400, this.game.cache.getBitmapData('buttonsmall'), function(button){this.muligane(button.player);},this.gameModel);
	this.muligageBtn2.text = this.muligageBtn2.addChild(this.game.add.text(0, 0, 'muligane', {font: '16px Arial Black'}));
	this.muligageBtn2.player = this.gameModel.players[1];
	
	this.validBtn = this.game.add.button(380, 305, this.game.cache.getBitmapData('buttonsmall'), function(button){this.valid(button.player);},this.gameModel);
	this.validBtn.text = this.validBtn.addChild(this.game.add.text(0, 0, 'valid', {font: '16px Arial Black'}));
	this.validBtn.player = this.gameModel.players[1];
	
	this.actionCardGroup = this.game.add.group();
	this.actionCardGroup.y=300;
	this.actionCardGroup.visible = false;
	this.actionCardGroup.poseBtn = this.game.add.button(0, 0, this.game.cache.getBitmapData('buttonsmall'), function(button){this.gameModel.poseCard(this.actionCardGroup.player,this.actionCardGroup.card);this.actionCardGroup.visible = false;},this);
	this.actionCardGroup.poseBtn.text = this.actionCardGroup.poseBtn.addChild(this.game.add.text(0, 0, 'pose', {font: '16px Arial Black'}));
	this.actionCardGroup.addChild(this.actionCardGroup.poseBtn);
	this.actionCardGroup.attaquantBtn = this.game.add.button(0, 20, this.game.cache.getBitmapData('buttonsmall'), function(button){this.declareAttaquantOrBloqueur(this.actionCardGroup.card);this.actionCardGroup.visible = false;},this);
	this.actionCardGroup.attaquantBtn.text = this.actionCardGroup.attaquantBtn.addChild(this.game.add.text(0, 0, 'attaquant', {font: '16px Arial Black'}));
	this.actionCardGroup.addChild(this.actionCardGroup.attaquantBtn);
	this.actionCardGroup.bloqueurBtn = this.game.add.button(0, 40, this.game.cache.getBitmapData('buttonsmall'), function(button){this.declareBloqueur(this.actionCardGroup.player,this.actionCardGroup.card);this.actionCardGroup.visible = false;},this);
	this.actionCardGroup.bloqueurBtn.text = this.actionCardGroup.bloqueurBtn.addChild(this.game.add.text(0, 0, 'bloqueur', {font: '16px Arial Black'}));
	this.actionCardGroup.addChild(this.actionCardGroup.bloqueurBtn);
	this.actionCardGroup.retirerBtn = this.game.add.button(0, 60, this.game.cache.getBitmapData('buttonsmall'), function(button){this.gameModel.retirerCard(this.actionCardGroup.player,this.actionCardGroup.card);this.actionCardGroup.visible = false;},this);
	this.actionCardGroup.retirerBtn.text = this.actionCardGroup.retirerBtn.addChild(this.game.add.text(0, 0, 'retirer', {font: '16px Arial Black'}));
	this.actionCardGroup.addChild(this.actionCardGroup.retirerBtn);
};

GameView.prototype.declareAttaquantOrBloqueur = function(cardModel) {
	if(this.gameModel.pm.isCurrentPhase(PHASE.DECLARATION_BLOQUEUR)) {
		this.declareBloqueur(cardModel);
	}
	else if(this.gameModel.pm.isCurrentPhase(PHASE.DECLARATION_ATTAQUANT)) {
		this.gameModel.declareAttaquant(this.gameModel.getPlayerActif(), cardModel);
	}	
};

GameView.prototype.declareBloqueur = function(cardModel) {
	if(this.gameModel.pm.isCurrentPhase(PHASE.DECLARATION_BLOQUEUR)) {
		this.bloqueur = cardModel;		
		this.showError('veuillez selectionner une creature a bloquer');
	} else {
		this.showError('vous ne pouvez pas faire cette action');
	}	
	this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
		this.showError("");
	}, this);	
};

GameView.prototype.declareBlockedCard = function(player,cardModel) {
	this.blockedCard = cardModel;
};

GameView.prototype.registerObserver = function() {
	this.gameModel.pm.addObserver(this);
	this.gameModel.stack.addObserver(this);
	this.gameModel.addObserver(this);
};

GameView.prototype.hideActionCard = function(cardView) {
	this.actionCardGroup.visible=false;
};

GameView.prototype.showActionCard = function(cardView) {
	if(this.gameModel.pm.isCurrentPhase(PHASE.DECLARATION_BLOQUEUR) && !this.gameModel.pm.currentPhase.hasDonedeclaration) {
		this.actionCardGroup.player = this.gameModel.getPlayerNonActif();
	}
	else {
		this.actionCardGroup.player = cardView.cardModel.owner;	
	}
	
	this.actionCardGroup.bloqueurBtn.inputEnabled = this.gameModel.pm.isCurrentPhase(PHASE.DECLARATION_ATTAQUANT) || this.gameModel.pm.isCurrentPhase(PHASE.DECLARATION_BLOQUEUR) ;

	this.actionCardGroup.card = cardView.cardModel;
	this.actionCardGroup.visible=true;
};

GameView.prototype.initPlayers = function(players) {
	for(var i=0;i<players.length;i++) {
		this.playersView[players[i].name] = {hand:[],terrains:[],battlefield:[]};
		var isMe = players[i].name == "pau";
		players[i].addObserver(this);
		for(var j=0;j<players[i].deck.length;j++) {
			var card = players[i].deck[j];
			var cardView = new CardView(this.game, card);
			cardView.ownerView = this.playersView[players[i].name];
			if(isMe) {
				cardView.x=CONFIG.deck[0][0];
				cardView.y=CONFIG.deck[0][1];
			}
			else {
				cardView.x=CONFIG.deck[1][0];
				cardView.y=CONFIG.deck[1][1];
			}
			cardView.inputEnabled = true;
			cardView.events.onInputUp.add(cardView.onClick, this);
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
		var posX = 100 + j*80+37;
		var posY;
		cardView.slot = j;
		if(isMe) {
			posY = this.game.world.centerY+52;
		}
		else{posY = this.game.world.centerY-104+52;}
		cardView.show(true);
		this.game.add.tween(cardView).to({x: posX,y:posY},1000,Phaser.Easing.Linear.None,true);
		cardView.slot = j;
		this.playersView[player.name].hand.push(cardView);
	}	
};

GameView.prototype.muliganeAnim = function(player) {
	var isMe = player.name == "pau";
	var posY;
	if(isMe) {
		posY=this.game.world.height -(208/2)+52;
	}
	else {
		posY=52;
	}
	for(var i=0;i<this.playersView[player.name].hand.length;i++) {
		this.game.add.tween(this.playersView[player.name].hand[i]).to({x: 37, y:posY},1000,Phaser.Easing.Linear.None,true);
		this.playersView[player.name].hand[i].show(false);
		this.playersView[player.name].hand[i] = null;
	}	
	setTimeout(function(player){
		var isMe = player.name == "pau";
		var y = this.game.world.centerY;
		if(isMe) {
			y = this.game.world.centerY+52;
		}
		else{y = this.game.world.centerY-104+52;}
		this.playersView[player.name].length=0;
		for(var i=0;i<player.hand.length;i++) {
			this.game.add.tween(player.hand[i].view).to({x: 100+37 + i*80, y:y},1000,Phaser.Easing.Linear.None,true);
			player.hand[i].view.show(true);
			player.hand[i].view.slot = i;
			this.playersView[player.name].hand[i] = player.hand[i].view;
		}
		}.bind(this,player), 2000);
};

GameView.prototype.moveCard = function(player) {
	var isMe = player.name == "pau";
	var posY;
	if(isMe) {
		posY=this.game.world.height - (208/2)+52;
	}
	else {
		posY=52;
	}
	for(var i=0;i<player.hand.length;i++) {
		this.game.add.tween(player.hand[i].view).to({y:posY},1000,Phaser.Easing.Linear.None,true);
	}	
};

GameView.prototype.poseTerrainAnim = function(player,card) {
	var isMe = player.name == "pau";
	var posY;
	if(isMe) {
		posY=this.game.world.height - (208/2)-52;
	}
	else {
		posY=104+52;
	}
	removePlayerSlot(this.playersView[card.owner.name],card.view);
	var slot = getFreeSlot(this.playersView[player.name].terrains);
	this.playersView[player.name].terrains[slot] = card.view;
	this.game.add.tween(card.view).to({x:100+37+80*slot, y:posY},1000,Phaser.Easing.Linear.None,true);
};

GameView.prototype.piocheCardAnim = function(player,card) {
	var isMe = player.name == "pau";
	var posY;
	if(isMe) {
		posY=600-52;
	}
	else {
		posY=52;
	}
	var slot = getFreeSlot(this.playersView[player.name].hand);
	this.playersView[player.name].hand[slot] = card.view;
	card.view.show(true);
	this.game.add.tween(card.view).to({x:100+37+80*slot, y:posY},1000,Phaser.Easing.Linear.None,true);
};

GameView.prototype.stackAnim = function(card) {
	removePlayerSlot(this.playersView[card.owner.name],card.view);
	this.game.add.tween(card.view).to({x:CONFIG.pile[0],y:CONFIG.pile[1]},1000,Phaser.Easing.Linear.None,true);
};

GameView.prototype.enterBattlefieldAnim = function(card) {
	var posY = this.game.world.centerY;
	var isMe = card.owner.name == "pau";
	if(isMe) {
		posY = this.game.world.centerY+52;
	}
	else{posY = this.game.world.centerY-104+52;}
	removePlayerSlot(this.playersView[card.owner.name],card.view);
	var slot = getFreeSlot(this.playersView[card.owner.name].battlefield);
	this.playersView[card.owner.name].battlefield[slot] = card.view;
	this.game.add.tween(card.view).to({y:posY,x:100+37+80*slot},1000,Phaser.Easing.Linear.None,true);
};

function getFreeSlot(tab) {
	for(var i=0;i<tab.length;i++) {
		if(tab[i] == null) return i;
	}
	return tab.length;
}

function removeSlot(tab,value) {
	for(var i=0;i<tab.length;i++) {
		if(tab[i] == value) {
			tab[i] = null;
			return;
		};
	}
}

function removePlayerSlot(player,value) {
	for(var i=0;i<player.hand.length;i++) {
		if(player.hand[i] == value) {
			player.hand[i] = null;
			return;
		};
	}
	for(var i=0;i<player.battlefield.length;i++) {
		if(player.battlefield[i] == value) {
			player.battlefield[i] = null;
			return;
		};
	}
}

GameView.prototype.gotoCemeteryAnim = function(card) {
	var isMe = card.owner.name == "pau";
	posX = this.game.world.width - (156/2)+37;
	if(isMe){
		posY = this.game.world.height - (208/2)+52;
	}
	else{
		posY = 52;		
	}
	removePlayerSlot(this.playersView[card.owner.name],card.view);
	this.game.add.tween(card.view).to({y:posY,x:posX},1000,Phaser.Easing.Linear.None,true);
};

GameView.prototype.showPhase = function(id) {
	this.phaseLabel.text = phaseMapping[id];
};

GameView.prototype.showError = function(error) {
	this.errorLabel.text = error;
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
			this.showError(event.data);	
			this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
				this.showError("");
			}, this);			
			break;
		case GameEvent.CHANGE_PHASE:
			this.showPhase(event.data);
		break;
		case GameEvent.MULIGANE:
			this.muliganeAnim(event.data.player);
			break;
		case GameEvent.WHO_BEGIN:
			this.muligageBtn.visible = false;
			this.muligageBtn2.visible = false;
			this.moveCard(this.gameModel.players[0]);
			this.moveCard(this.gameModel.players[1]);
			this.tokenLabel.x=20;
			this.tokenLabel.y=(event.data.name == 'pau' ? 580:0);
			this.actifLabel.x=0;
			this.actifLabel.y=(event.data.name == 'pau' ? 580:0);
			break;
		case GameEvent.DEGAGEMENT:
			this.game.add.tween(event.data.view).to({angle:0},500,Phaser.Easing.Linear.None,true);
			break;
		case GameEvent.ENGAGEMENT:
			this.game.add.tween(event.data.view).to({angle:90},500,Phaser.Easing.Linear.None,true);
			break;
		case GameEvent.POSE_TERRAIN:
			this.poseTerrainAnim(event.data.player,event.data.card);
			break;
		case GameEvent.ENTER_BATTLEFIELD:
			this.enterBattlefieldAnim(event.data);
			break;
		case GameEvent.NEXT_TOKEN:
			this.tokenLabel.y=(event.data.name == 'pau' ? 580:0);
			break;
		case GameEvent.NEXT_PLAYER:
			this.actifLabel.y=(event.data.name == 'pau' ? 580:0);
			break;
		case GameEvent.GOTO_CEMETERY:
			this.gotoCemeteryAnim(event.data);
			break;
		case GameEvent.PIOCHE_CARD:
			this.piocheCardAnim(event.data.player,event.data.card);
			break;
		case GameEvent.RETIRER_CARD:
				this.showError('retirez des cartes');
			break;
	}
};