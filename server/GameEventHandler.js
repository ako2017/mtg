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
			case GameEvent.DISTRIBUTION:
			//	this.distributionAnim(event.data);
				break;
			default :
				console.log('evenement non gere');
		}
	}

	handleInit(handleInitData) {
		var dataToSend = [];
		console.log("handle init");
		for(let i=0;i<handleInitData.length;i++) {
			let player = handleInitData[i];
			var playerData = {player:player};
			var deckToSend = {};
			for(let j=0;j<player.deck.length;j++) {
				deckToSend.push({cardId:player.deck[j].id,uid:player.deck[j].uid});
			}
			playerData.deckToSend = deckToSend;
			dataToSend.push(playerData);
		}
		//socketApi.sendNotification(dataToSend);
	}

	
}

module.exports = GameEventHandler;