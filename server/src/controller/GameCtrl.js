var gameSrv = require('../model/Board');

Party = function () {
	this.board;
}

GameCtrl = function () {
	this.parties = [];
};

GameCtrl.prototype.joinParty = function(socket,data) {
	if(this.isLogged(socket)) {
		var board = this.findFreeParty();
		if(board == null) {
			board = this.createParty().board;
		}
		if(board.join(socket.player)) {
			socket.emit('DISPATCHER',{fnc:'JOIN_OK'});
			socket.board = board;
			if(board.canPlay()) {
				console.log("lancement de la parte dans 5sec");
				this.io.emit('DISPATCHER',{fnc:'READY_FOR_PLAY'});		
				setTimeout(this.distributionState.bind(this), 5000,board);
			}		
		}
		else {
			socket.emit('DISPATCHER',{fnc:'JOIN_KO'});
		}
	}
};

GameCtrl.prototype.findFreeParty = function() {
	console.log("recherche partie libre");
	for(var i = 0;i<this.parties.length;i++) {
		if(!this.parties[i].board.isFull() && !this.parties[i].board.isEnd()) {
			return this.parties[i].board;
			console.log("partie libre trouvée");
		}
	}
	console.log("pas de partie libre trouvée");
	return null;
};

GameCtrl.prototype.createParty = function() {
	console.log("création de partie libre");
	var party = new Party(new Board());
	this.parties.push(party);
	return party;
};

GameCtrl.prototype.distributionState = function(board) {
	console.log("lancement de la partie");
	board.changecurrentState(States.DISTRIBUTION);
	var players = board.players;
	//distibution des cartes
	for(var i=0;i<players.length;i++) {
		this.emit(players[i].socket, 'DISTRIBUTION',{cards:players[i].hand});
	}
};

GameCtrl.prototype.whoBeginState = function(board) {
	board.changecurrentState(States.WHO_BEGIN);
	for(var i=0;i<players.length;i++) {
		this.emit(players[i].socket, 'WHO_BEGIN',{cards:players[i].hand});
	}
	console.log("degagement state dans 5sec");
	setTimeout(this.degagementState.bind(this), 5000,board);
};

GameCtrl.prototype.degagementState = function(board) {
	board.changecurrentState(States.DEGAGEMENT);
};


GameCtrl.prototype.changeCards = function(socket,data) {
	if(isLoged(socket)) {
		console.log("changement de cartes");
		var board = socket.board;
		if(board.canChangeCard(socket.player,cards)) {
			cards = board.changeCard();			
			this.emit(socket, 'CHANGE_CARDS',{cards:cards});
			if(board.allDistribDone()) {
				console.log("who begin state dans 5sec");
				setTimeout(this.whoBeginState.bind(this), 5000,board);
			}
		}
	}
};

GameCtrl.prototype.poseCard = function(socket,data) {
	if(isLoged(socket)) {
		var board = socket.board;
		var card = socket.player.getCardById(data.cardId);
		if(board.canPoseCard(player,card)) {
			board.poseCard(player,card);
		}
		else {
			this.emit(socket.player, 'ERROR',socket.player.error);
		}
	}
};

GameCtrl.prototype.isLogged = function(socket) {
	return socket.player != null;
};

GameCtrl.prototype.loggin = function(socket,data) {
	console.log("loggin");
	socket.player = new Player();
	for(var i=0;i<60;i++) {
		socket.player.deck.push(new Card(socket.id,null,null));
	}
	socket.player.socket = socket;
};

GameCtrl.prototype.emit = function(socket, action, data) {
	socket.emit('DISPATCHER',{fnc:action,data});
};

module.exports = GameCtrl;