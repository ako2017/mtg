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

}

module.exports = GameEventHandler;