Dispatcher = function (game,mainMenuState,gameState) {
	this.game = game;
	this.mainMenuState = mainMenuState;
	this.gameState = gameState;
	this.board = null;
};

Dispatcher.prototype.dispatch = function(message,data) {
	if(message === 'JOIN_OK') {
		this.mainMenuState.showMessage('En attente de joueurs');
	} 
	else if(message === 'LANCEMENT') {
		this.mainMenuState.showMessage('lancement dans 10 sec');
		this.game.state.start("Game");
	}
	else if(message === 'ATTACK') {
		this.gameState.board.getCard(id).attack(data);
	}
	else if(message === 'DISTRIBUTION') {
		var event = new Event(EventEnum.DISTRIBUTION,data);
		this.gameState.board.onReceive([event]);
	}
};