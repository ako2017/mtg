const GameEvent = require('./model/Constantes').GameEvent;

class GameEventHandler  {

	constructor(socketApi) {
		this.socketApi = socketApi;
	}

	onReceive(event) {
		switch(event.type) {
			case GameEvent.INIT:
				this.handleInit(event.data);
				break;
			case GameEvent.CHANGE_PHASE:
				this.socketApi.sendEvent(GameEvent.CHANGE_PHASE, {phase:event.data});
				break;	
			case GameEvent.DISTRIBUTION:
				this.handleDistribution(event.data);
				break;
			case GameEvent.MULIGANE:
				this.handleMuligane(event.data);
				break;
			case GameEvent.WHO_BEGIN:
				this.handleWhoBegins(event.data);
				break;
			case GameEvent.MULIGANE_VALID:
				this.handleMuliganeValid(event.data);
				break;
			case GameEvent.RETIRER_CARD:
				this.retirerCard(event.data);
				break;
			case GameEvent.NEXT_TOKEN:
				this.nextToken(event.data);
				break;
			case GameEvent.PIOCHE_CARD:
				this.piocheCard(event.data);
				break;
			case GameEvent.GOTO_CEMETERY:
				this.gotoCemetery(event.data);
				break;
			case GameEvent.NEXT_PLAYER:
				this.nextPlayer(event.data);
				break;
			default :
				console.log('evenement non gere :' + event.type);
		}
	}

	handleInit(handleInitData) {
		var dataToSend = [];
		console.log("handle init");
		for(let i=0;i<handleInitData.length;i++) {
			let player = handleInitData[i];
			var playerData = {name:player.name};
			var deck = [];
			for(let j=0;j<player.deck.length;j++) {
				deck.push({id:player.deck[j].id,uid:player.deck[j].uid});
			}
			playerData.deck = deck;
			dataToSend.push(playerData);
		}
		this.socketApi.sendEvent(GameEvent.INIT, dataToSend);
	}

	handleDistribution(distributionData) {
		var dataToSend = [];
		console.log("handle distribution");
		for(let i=0;i<distributionData.length;i++) {
			let player = distributionData[i];
			var playerData = {name:player.name};
			var deck = [];
			for(let j=0;j<player.hand.length;j++) {
				deck.push(player.hand[j].uid);
			}
			playerData.hand = deck;
			dataToSend.push(playerData);
		}
		this.socketApi.sendEvent(GameEvent.DISTRIBUTION, dataToSend);
	}

	handleMuligane(muliganeData) {
		console.log("handle muligane");
		let player = muliganeData;
		var playerData = {name:muliganeData.name};
		var cards = [];
		for(let j=0;j<player.hand.length;j++) {
			cards.push(player.hand[j].uid);
		}
		playerData.cards = cards;
		this.socketApi.sendEvent(GameEvent.MULIGANE, playerData);
	}

	handleMuliganeValid(muliganeValidData) {
		console.log("handle muliganeValid");
		var playerData = {name:muliganeValidData.name};
		this.socketApi.sendEvent(GameEvent.MULIGANE_VALID, playerData);
	}

	handleWhoBegins(whoBeginsData) {
		console.log("handle whoBegins");
		var playerData = {name:whoBeginsData.name};
		this.socketApi.sendEvent(GameEvent.WHO_BEGIN, playerData);
	}

	retirerCard(retirerCard) {
		console.log("handle retirerCard");
		var playerData = {name:retirerCard.name};
		this.socketApi.sendEvent(GameEvent.RETIRER_CARD, playerData);
	}

	nextToken(nextTokenData) {
		console.log("handle nextToken");
		var playerData = {name:nextTokenData.name};
		this.socketApi.sendEvent(GameEvent.NEXT_TOKEN, playerData);
	}

	nextPlayer(nextPlayerData) {
		console.log("handle nextPlayer");
		var playerData = {name:nextPlayerData.name};
		this.socketApi.sendEvent(GameEvent.NEXT_PLAYER, playerData);
	}

	piocheCard(piocheCardData) {
		console.log("handle piocheCard");
		var playerData = {name:piocheCardData.player.name,card:piocheCardData.card.uid};
		this.socketApi.sendEvent(GameEvent.PIOCHE_CARD, playerData);
	}

	gotoCemetery(gotoCemeteryData) {
		console.log("handle gotoCemetery");
		var playerData = {name:gotoCemeteryData.owner.name,card:gotoCemeteryData.uid};
		this.socketApi.sendEvent(GameEvent.GOTO_CEMETERY, playerData);
	}

}

module.exports = GameEventHandler;