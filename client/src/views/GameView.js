CONFIG = {
	pilelabel : [0,180],
	pile : [37,248],
	deck : [[37,548],[37,52]],
	cemeterylabel : [[705,480],[705,100]],
	cemetery : [[725,496],[725,0]],
	phase : [680,280],
	error : [400,300],
	mana : [480,100]
}

phaseMapping = [];

phaseMapping[PHASE.DISTRIBUTION] ="DISTRIBUTION";
phaseMapping[PHASE.WHO_BEGINS] = "WHO_BEGINS";
phaseMapping[PHASE.DEGAGEMENT] = "DEGAGEMENT";
phaseMapping[PHASE.ENTRETIENT] = "ENTRETIENT";
phaseMapping[PHASE.PIOCHE] = "PIOCHE";
phaseMapping[PHASE.PRINCIPALE] = "PRINCIPALE";
phaseMapping[PHASE.DECLARATION_ATTAQUANT] = "DECLARATION\nATTAQUANT";
phaseMapping[PHASE.DECLARATION_BLOQUEUR] = "DECLARATION\nBLOQUEUR";
phaseMapping[PHASE.ATTRIBUTION_BLESSURE] = "ATTRIBUTION\nBLESSURE";
phaseMapping[PHASE.FIN] = "FIN";
phaseMapping[PHASE.NETTOYAGE] = "NETTOYAGE";

class GameView extends Phaser.Group {
	constructor(game) {
		super(game);
		this.playersView = [];
		this.myName = '';
		this.isRunningAnimation = false;
		this.events = [];
		this.cardSelected = null;
	}

	init() {
		/*this.back = this.game.make.sprite(0, 0, 'fond');
		this.back.scale.set(0.5, 0.5);
		this.addChild(this.back);
		this.initPlayers(gameModel.players);*/
		this.game.add.text(CONFIG.pilelabel[0], CONFIG.pilelabel[1], 'PILE', { font: '14px Arial Black',fill: '#fff',strokeThickness: 4 });
		this.game.add.text(CONFIG.cemeterylabel[0][0], CONFIG.cemeterylabel[0][1], 'CEMETERY', {font: '14px Arial Black',fill: '#fff',strokeThickness: 4});
		this.game.add.text(CONFIG.cemeterylabel[1][0], CONFIG.cemeterylabel[1][1], 'CEMETERY', {font: '14px Arial Black',fill: '#fff',strokeThickness: 4});
		this.phaseLabel = this.game.add.text(CONFIG.phase[0], CONFIG.phase[1], '', {font: '14px Arial Black',fill: '#fff',strokeThickness: 4});
		this.errorLabel = this.game.add.text(CONFIG.error[0], CONFIG.error[1], '', {font: '14px Arial Black',fill: '#fff',strokeThickness: 4});
		this.errorLabel.anchor.x = 0.5;
		this.tokenLabel = this.game.add.image(800, 0, this.game.cache.getBitmapData('token'));
		this.actifLabel = this.game.add.image(800, 0, this.game.cache.getBitmapData('actif'));
		this.bandeau = this.game.add.image(0, 295, this.game.cache.getBitmapData('bandeau'));

		var gameController = new GameController(this);

		this.muligageBtn = this.game.add.button(0, 110, this.game.cache.getBitmapData('buttonsmall'), function(button){gameController.muliganeBtn();},this);
		this.muligageBtn.text = this.muligageBtn.addChild(this.game.add.text(0, 0, 'muligane', {font: '16px Arial Black'}));
		this.muligageBtn.player = null;//gameModel.players[0];
		
		this.validBtn = this.game.add.button(380, 270, this.game.cache.getBitmapData('buttonsmall'), function(button){gameController.validBtn();},this);
		this.validBtn.text = this.validBtn.addChild(this.game.add.text(0, 0, 'valid', {font: '16px Arial Black'}));
		this.validBtn.player = null;//gameModel.players[0];
		
		this.actionCardGroup = this.game.add.group();
		this.actionCardGroup.y=300;
		this.actionCardGroup.visible = false;
		this.actionCardGroup.poseBtn = this.game.add.button(0, 0, this.game.cache.getBitmapData('buttonsmall'), function(button){gameController.poseCard(this.actionCardGroup.card);this.hideActionCard();},this);
		this.actionCardGroup.poseBtn.text = this.actionCardGroup.poseBtn.addChild(this.game.add.text(0, 0, 'pose', {font: '16px Arial Black'}));
		this.actionCardGroup.addChild(this.actionCardGroup.poseBtn);
		this.actionCardGroup.attaquantBtn = this.game.add.button(0, 20, this.game.cache.getBitmapData('buttonsmall'), function(button){gameController.declareAttaquantOrBloqueur(this.actionCardGroup.card);this.hideActionCard();},this);
		this.actionCardGroup.attaquantBtn.text = this.actionCardGroup.attaquantBtn.addChild(this.game.add.text(0, 0, 'attaquant', {font: '16px Arial Black'}));
		this.actionCardGroup.addChild(this.actionCardGroup.attaquantBtn);
		this.actionCardGroup.retirerBtn = this.game.add.button(0, 60, this.game.cache.getBitmapData('buttonsmall'), function(button){gameController.retirerCard(this.actionCardGroup.card);this.hideActionCard();},this);
		this.actionCardGroup.retirerBtn.text = this.actionCardGroup.retirerBtn.addChild(this.game.add.text(0, 0, 'retirer', {font: '16px Arial Black'}));
		this.actionCardGroup.addChild(this.actionCardGroup.retirerBtn);
		this.actionCardGroup.engageBtn = this.game.add.button(0, 80, this.game.cache.getBitmapData('buttonsmall'), function(button){gameController.engage(this.actionCardGroup.card);this.hideActionCard();},this);
		this.actionCardGroup.engageBtn.text = this.actionCardGroup.engageBtn.addChild(this.game.add.text(0, 0, 'engager', {font: '16px Arial Black'}));
		this.actionCardGroup.addChild(this.actionCardGroup.engageBtn);
	}

	update() {
		if(!this.isRunningAnimation) {
			if(this.events.length > 0) {
				var event = this.events.shift();
				this.handleEvent(event);
			}
		}
	}
	
	hideActionCard() {
		this.actionCardGroup.visible=false;
	}
	
	showActionCard(cardView) {
		this.actionCardGroup.poseBtn.visible = false;
		this.actionCardGroup.attaquantBtn.visible = false;
		this.actionCardGroup.retirerBtn.visible = false;
		this.actionCardGroup.engageBtn.visible = false;
		
		if(cardView.type == TypeCard.TERRAIN && !cardView.isEngaged()) {
			this.actionCardGroup.engageBtn.visible = true;
		}
		
		if(this.gameCtrl.isCurrentPhase(PHASE.PRINCIPALE) && (!cardView.ownerView.terrains.contains(cardView) &&  !cardView.ownerView.battlefield.contains(cardView))) {
			this.actionCardGroup.poseBtn.visible = true;
		}
		
		if(this.gameCtrl.isCurrentPhase(PHASE.DECLARATION_BLOQUEUR) && !this.gameCtrl.hasDonedeclaration()) {
			this.actionCardGroup.player = this.gameCtrl.getPlayerNonActif();
		}
		else {
			this.actionCardGroup.player = cardView.cardModel.owner;	
		}
		
		if(this.gameCtrl.isCurrentPhase(PHASE.DECLARATION_ATTAQUANT)) {
			this.actionCardGroup.attaquantBtn.visible = cardView.cardModel.owner == this.gameCtrl.getPlayerActif();
		}
		else if(this.gameCtrl.isCurrentPhase(PHASE.DECLARATION_BLOQUEUR)){
			if(this.bloqueur==null && cardView.cardModel.owner == this.gameCtrl.getPlayerNonActif() && cardView.cardModel.type == TypeCard.CREATURE) {
				this.actionCardGroup.attaquantBtn.visible =true;
			}
			if(this.bloqueur!=null && cardView.cardModel.owner == this.gameCtrl.getPlayerActif()) {
				this.actionCardGroup.attaquantBtn.visible =true;
			}
		}
		
		if(this.gameCtrl.isCurrentPhase(PHASE.NETTOYAGE) && cardView.cardModel.owner == this.gameCtrl.getPlayerActif()) {
			this.actionCardGroup.retirerBtn.visible = true;
			this.actionCardGroup.player = cardView.cardModel.owner;
		}
		
		var text = '';
		if(cardView.model.owner == this.gameCtrl.getPlayerActif()) {
			text = 'attaquant';
		}
		else {
			text = 'bloqueur';
		}
		this.actionCardGroup.attaquantBtn.text.text = text;
		this.actionCardGroup.card = cardView;
		this.actionCardGroup.visible=true;
	}
	
	/**
	 * Pour chaque joueur on construit sa vue (représentation physique)
	 * @param {*} playersData 
	 */
	initPlayers(players) {
		for(var i=0;i<players.length;i++) {
			this.playersView[players[i].name] = new PlayerView();
			
			// on vérifie si c'est nous le joueur que l'on traite (l'affichage des carte sera différent)
			var isMe = players[i].name == this.myName;

			// création du label de vie du joueur
			this.playersView[players[i].name].lifeLabel = this.game.add.text(0, isMe?500:0, players[i].life, {font: '14px Arial Black',fill: '#fff',strokeThickness: 4});
			
			//création des labels pour les 5 valeurs de mana
			for(var j=0;j<5;j++) {
				this.playersView[players[i].name].manaLabel[j] = this.game.add.text(j*12, isMe?CONFIG.mana[0]:CONFIG.mana[1], '0', {font: '14px Arial Black',fill: '#fff',strokeThickness: 4});			
			}
			
			// on contruit le deck du joueur
			for(var j=0;j<players[i].deck.length;j++) {
				var cardData = players[i].deck[j];
				var cardView = new CardView(this.game, cardTable[cardData.id],cardData.uid, this);
				this.playersView[players[i].name].deck.push(cardView);

				if(isMe) {
					cardView.x=CONFIG.deck[0][0];
					cardView.y=CONFIG.deck[0][1];
				}
				else {
					cardView.x=CONFIG.deck[1][0];
					cardView.y=CONFIG.deck[1][1];
				}
				cardView.inputEnabled = true;
				cardView.events.onInputUp.add(cardView.onClick, cardView);
				cardView.events.onInputOver.add(cardView.onOver, cardView);
				cardView.events.onInputOut.add(cardView.onOut, cardView);
				this.addChild(cardView);
			}
		}	
	}
	
	distributionAnim(distributionAnimData) {
		this.lockAnimation();
		for(var i=0;i<distributionAnimData.length;i++) {
			var isMe = distributionAnimData[i].name == this.myName;
			var cards = distributionAnimData[i].hand;	
			for(var j=0;j<cards.length;j++) {
				var cardView = this.playersView[distributionAnimData[i].name].getDeckById(cards[j]);
				this.playersView[distributionAnimData[i].name].deck.removeByValue(cardView);
				var posX = 100 + j*80+37;
				var posY;
				if(isMe) {
					posY = this.game.world.centerY+52;
					cardView.show(true);
				}
				else{
					posY = this.game.world.centerY-52;
					
				}
				this.game.add.tween(cardView).to({x: posX,y:posY},1000,Phaser.Easing.Linear.None,true);
				this.playersView[distributionAnimData[i].name].hand.push(cardView);
			}	
		}
		this.unlockAnimation(1);
	}

	lockAnimation() {
		this.isRunningAnimation = true;
	}

	unlockAnimation(delay) {
		if(delay) {
			this.game.time.events.add(Phaser.Timer.SECOND * delay, function(){
				this.isRunningAnimation = false;
			}, this);
		}
		else {
			this.isRunningAnimation = false;
		}
	}
	
	muliganeAnim(muliganeData) {
		var isMe = muliganeData.name == this.myName;
		var posY;
		if(isMe) {
			posY=this.game.world.height -(208/2)+52;
		}
		else {
			posY=52;
		}
		for(var i=0;i<this.playersView[muliganeData.name].hand.length;i++) {
			this.game.add.tween(this.playersView[muliganeData.name].hand[i]).to({x: 37, y:posY},1000,Phaser.Easing.Linear.None,true);
			var card = this.playersView[muliganeData.name].hand[i];
			card.show(false);
			this.playersView[muliganeData.name].deck.push(card);
		}
		this.playersView[muliganeData.name].hand.length = 0;
		setTimeout(function(player){
			var isMe = muliganeData.name == this.myName;
			var y = this.game.world.centerY;
			if(isMe) {
				y = this.game.world.centerY+52;
			}
			else{y = this.game.world.centerY-104+52;}
			for(var i=0;i<muliganeData.cards.length;i++) {
				var card = player.getDeckById(muliganeData.cards[i]);
				player.deck.removeByValue(card);
				this.game.add.tween(card).to({x: 100+37 + i*80, y:y},1000,Phaser.Easing.Linear.None,true);
				card.show(true);
				card.slot = i;
				this.player.hand[i].push(card);
			}
			}.bind(this,this.playersView[muliganeData.name]), 2000);
	}
	
	muliganeValidAnim(muliganeValidData) {
		this.lockAnimation();
		var isMe = this.myName == muliganeValidData.name;
		var posY;
		if(isMe) {
			posY=this.game.world.height - (208/2)+52;
		}
		else {
			posY=52;
		}
		var playerView = this.playersView[muliganeValidData.name];
		for(var i=0;i<playerView.hand.length;i++) {
			this.game.add.tween(playerView.hand[i]).to({y:posY},1000,Phaser.Easing.Linear.None,true);
		}
		this.unlockAnimation(1);
	}
	
	poseTerrainAnim(poseTerrainAnimData) {
		this.lockAnimation();
		var isMe = poseTerrainAnimData.name == this.myName;
		var posY;
		if(isMe) {
			posY=this.game.world.height - (208/2)-52;
		}
		else {
			posY=104+52;
		}
		var card = this.playersView[poseTerrainAnimData.name].getHandById(poseTerrainAnimData.card);
		this.playersView[poseTerrainAnimData.name].hand.removeByValue(card);
		this.playersView[poseTerrainAnimData.name].terrains.push(card);
		for(var i = 0;i<this.playersView[poseTerrainAnimData.name].terrains.length;i++) {
			this.game.add.tween(this.playersView[poseTerrainAnimData.name].terrains[i]).to({x:100+37+80*i, y:posY},1000,Phaser.Easing.Linear.None,true);
		}
		this.unlockAnimation(1);
	}
	
	piocheCardAnim(piocheCardAnimData) {
		this.lockAnimation();
		var isMe = piocheCardAnimData.name == this.myName;
		var posY;
		if(isMe) {
			posY=600-52;
		}
		else {
			posY=52;
		}
		var card = this.playersView[piocheCardAnimData.name].getDeckById(piocheCardAnimData.card);

		this.playersView[piocheCardAnimData.name].deck.removeByValue(card);
		this.playersView[piocheCardAnimData.name].hand.push(card);
		card.show(true);

		for(var i =0;i<this.playersView[piocheCardAnimData.name].hand.length;i++) {
			this.game.add.tween(this.playersView[piocheCardAnimData.name].hand[i]).to({x:100+37+80*i, y:posY},1000,Phaser.Easing.Linear.None,true);
		}
		this.unlockAnimation(1);
	}
	
	stackAnim(stackAnimData) {
		this.lockAnimation();
		var card = this.playersView[stackAnimData.name].getHandById(stackAnimData.card);
		this.game.add.tween(card).to({x:CONFIG.pile[0],y:CONFIG.pile[1]},1000,Phaser.Easing.Linear.None,true)
		.onComplete.add(function(){
			this.unlockAnimation();
		},this);
	}
	
	enterBattlefieldAnim(enterBattlefieldAnimData) {
		this.lockAnimation();
		var card = this.playersView[enterBattlefieldAnimData.name].getHandById(enterBattlefieldAnimData.card);
		if(enterBattlefieldAnimData.malInvocation)
			card.front.tint = 0x696969;
		var posY = this.game.world.centerY;
		var isMe = enterBattlefieldAnimData.name == this.myName;
		if(isMe) {
			posY = this.game.world.centerY+52;
		}
		else{
			posY = this.game.world.centerY-104+52;
		}
		card.show(true);
		this.playersView[enterBattlefieldAnimData.name].battlefield.push(card);
		for(var i = 0;i<this.playersView[enterBattlefieldAnimData.name].battlefield.length;i++) {
			this.game.add.tween(this.playersView[enterBattlefieldAnimData.name].battlefield[i]).to({y:posY,x:100+37+80*i},1000,Phaser.Easing.Linear.None,true);	
		}
		this.unlockAnimation(1);
	}
	
	gotoCemeteryAnim(card) {
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
	}
	
	declareBloqueurAnim(declareBloqueurAnim) {
		this.lockAnimation();
		var cardA = this.playersView[declareBloqueurAnim.nameA].getBattlefieldById(declareBloqueurAnim.cardA);
		var cardB = this.playersView[declareBloqueurAnim.nameB].getBattlefieldById(declareBloqueurAnim.cardB);

		var dist = Phaser.Math.distance(cardA.x, cardA.y,cardB.x, cardB.y);
		var deg = Phaser.Math.radToDeg(Phaser.Math.angleBetween(cardA.x, cardA.y,cardB.x, cardB.y));
		var line = this.game.add.tileSprite(cardA.x, cardA.y, dist, 5, 'line');
		line.angle = deg;
		this.unlockAnimation(1);
	}

	declareAttaquantAnim(declareAttaquantAnim)
	{
		this.lockAnimation();
		this.game.add.tween(this.playersView[declareAttaquantAnim.name].getBattlefieldById(declareAttaquantAnim.card)).to({angle:90},500,Phaser.Easing.Linear.None,true);
		this.unlockAnimation(1);
	}
	
	restaureBloqueurAnim(playerName) {
		var isMe = playerName == "pau";
		var game = this.game;
	
		this.playersView[playerName].battlefield.forEach(function(card){
			if(card != null && card.cardModel.blockCard != null) {
				var posY =0;
				if(isMe) {
					posY = game.world.centerY+52;
				}
				else{posY = game.world.centerY-104+52;}
				game.add.tween(card).to({x:100+37+80*card.slot,y:posY},1000,Phaser.Easing.Linear.None,true);
			}
		});
	}
	
	damageAnim(card) {
	}
	
	manaAnim(manaAnimData) {
		for(var i =0;i<5;i++)
			this.playersView[manaAnimData.name].mana[i].text=manaAnimData.mana[i];
	}
	
	changePhaseAnim(changePhaseAnimData) {
		this.phaseLabel.text = phaseMapping[changePhaseAnimData.phase];
	}
		
	playerLifeAnim(playerLifeAnimData) {
		this.playersView[playerLifeAnimData.name].lifeLabel.text = playerLifeAnimData.life;

		this.game.add.tween(this.playersView[playerLifeAnimData.name].lifeLabel.scale).to( { x: 2, y: 2 }, 500, Phaser.Easing.Linear.None, true,0,0,true);
	}

	whoBeginAnim(whoBeginAnimData) {
		//this.muligageBtn.visible = false;
		//this.muligageBtn2.visible = false;
		this.tokenLabel.x=20;
		this.tokenLabel.y=(whoBeginAnimData.name == this.myName ? 580:0);
		this.actifLabel.x=0;
		this.actifLabel.y=(whoBeginAnimData.name == this.myName ? 580:0);
	}

	engagementAnim(engagementAnimData) {
		this.lockAnimation();
		var card = this.playersView[engagementAnimData.name].getCardByIdAll(engagementAnimData.card);
		this.game.add.tween(card).to({angle:90},500,Phaser.Easing.Linear.None,true)
		.onComplete.add(function(){
			this.unlockAnimation();
		},this);	
	}

	degagementAnim(degagementAnimData) {
		this.lockAnimation();
		var card = this.playersView[degagementAnimData.name].getCardByIdAll(degagementAnimData.card);
		this.game.add.tween(card).to({angle:0},500,Phaser.Easing.Linear.None,true)
		.onComplete.add(function(){
			this.unlockAnimation();
		},this);	
	}

	errorAnim(errorAnimData) {
		this.errorLabel.text = errorAnimData.error;	
		this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
			this.errorLabel.text = '';
		}, this);
	}

	attackAnim(attackAnimData) {
		this.lockAnimation();
		var cardA = this.playersView[attackAnimData.nameA].getBattlefieldById(attackAnimData.cardA.uid);
		var cardB = this.playersView[attackAnimData.nameB].getBattlefieldById(attackAnimData.cardB.uid);

		var posXA = cardA.x;
		var posXB = cardB.x;

		var centerX = this.game.world.centerX;		

		this.game.add.tween(cardA).to({x:centerX},1000,Phaser.Easing.Linear.None)
		.to({ y: cardB.y - cardB.height/2}, 2000, Phaser.Easing.Bounce.In)
		.to({y:cardA.y},1000,Phaser.Easing.Linear.None, true)
		.onComplete.add(function(){
			cardB.front.endurance.text = attackAnimData.cardA.endur;
		},this);
		this.game.add.tween(cardB).to({x:centerX},1000,Phaser.Easing.Linear.None)
		.to({ y: cardA.y }, 2000, Phaser.Easing.Bounce.In,false,3000)
		.to({ y: cardB.y }, 1000, Phaser.Easing.Linear.None,true)
		.onComplete.add(function(){
			cardA.front.endurance.text = attackAnimData.cardB.endur;
			this.game.add.tween(cardA).to({x:posXA},2000,Phaser.Easing.Linear.None, true);
			this.game.add.tween(cardB).to({x:posXB},2000,Phaser.Easing.Linear.None, true);
		},this);
		this.unlockAnimation(10);
	}

	attackPlayerAnim(attackPlayerAnimData) {
		this.lockAnimation();
		var card = this.playersView[attackPlayerAnimData.nameA].getBattlefieldById(attackPlayerAnimData.card);

		var posXB = this.playersView[attackPlayerAnimData.nameB].lifeLabel.x;
		var posYB = this.playersView[attackPlayerAnimData.nameB].lifeLabel.y;

		var posXA = card.x;
		var posYA = card.y;

		var centerX = this.game.world.centerX;		

		this.game.add.tween(card).to({x:centerX},1000,Phaser.Easing.Linear.None)
		.to({ x:posXB, y: posYB }, 1000, Phaser.Easing.Linear.None,false)
		.to({ x:posXA, y: posYA }, 2000, Phaser.Easing.Linear.None,true)
		.onComplete.add(function(){
			this.unlockAnimation();
		},this);
	}

	nextTokenAnim(nextTokenAnimData) {
		this.tokenLabel.y=(nextTokenAnimData.name == this.myName ? 580:0);
	}

	nextPlayerAnim(nextPlayerAnimData) {
		this.actifLabel.y=(nextPlayerAnimData.name == this.myName ? 580:0);
	}

	retirerCardAnim(retirerCardAnimData) {
		if(retirerCardAnimData.name == this.myName) {
			this.errorLabel.text = 'veuillez retirer une carte';
		}
	}
	
	onReceive(event) {
		this.events.push(event);
	}

	handleEvent(event) {
		switch(event.type) {
			case GameEvent.DISTRIBUTION:
				this.distributionAnim(event.data);
				break;
			case GameEvent.STACK_CARD:
				this.stackAnim(event.data);
				break;
			case GameEvent.ERROR:
				this.errorAnim(event.data);			
				break;
			case GameEvent.CHANGE_PHASE:
				this.changePhaseAnim(event.data);
			break;
			case GameEvent.MULIGANE:
				this.muliganeAnim(event.data);
				break;
			case GameEvent.MULIGANE_VALID:
				this.muliganeValidAnim(event.data);
				break;
			case GameEvent.WHO_BEGIN:
				this.whoBeginAnim(event.data);
				break;
			case GameEvent.DEGAGEMENT:
				this.degagementAnim(event.data);
				break;
			case GameEvent.ENGAGEMENT:
				this.engagementAnim(event.data);
				break;
			case GameEvent.POSE_TERRAIN:
				this.poseTerrainAnim(event.data);
				break;
			case GameEvent.ENTER_BATTLEFIELD:
				this.enterBattlefieldAnim(event.data);
				break;
			case GameEvent.DECLARE_BLOQUEUR:
				this.declareBloqueurAnim(event.data);
				break;
			case GameEvent.DECLARE_ATTAQUANT:
				this.declareAttaquantAnim(event.data);
				break;
			case GameEvent.NEXT_TOKEN:
				this.nextTokenAnim(event.data);
				break;
			case GameEvent.NEXT_PLAYER:
				this.nextPlayerAnim(event.data);
				break;
			case GameEvent.GOTO_CEMETERY:
				this.gotoCemeteryAnim(event.data);
				break;
			case GameEvent.PIOCHE_CARD:
				this.piocheCardAnim(event.data);
				break;
			case GameEvent.RETIRER_CARD:
				this.retirerCardAnim(event.data)
				break;
			case GameEvent.RESTAURE_BLOQUEURS:
				this.restaureBloqueurAnim(event.data);
				break;
			case GameEvent.PLAYER_LIFE:
				this.playerLifeAnim(event.data);
				break;
			case GameEvent.UPDATE_MANA:
				this.manaAnim(event.data);
				break;
			case GameEvent.RESTAURE_MAL_INVOCATION:
				event.data.forEach(function(card) {
					card.view.front.tint = 0xffffff;
				});
			case GameEvent.ATTACK:
				this.attackAnim(event.data);
				break;
			case GameEvent.ATTACK_PLAYER:
				this.attackPlayerAnim(event.data);
				break;
			default :
				alert('evenement inconnu');
		}
	}

} 