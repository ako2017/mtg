Board = function () {
	Observable.call(this);
	this.playerActif = 0;
	this.token = 0;
	this.stack = [];
	this.players = [];
	this.isServer;
	this.phase = Phase.DISTRIBUTION;
	this.etape = Etape.IDLE;
	this.sousEtape = SousEtape.IDLE;
	this.timer = 0;
	this.attaquants = [];
	this.bloqueurs = [];
	this.mode;
};

Board.prototype = new Observable();

Board.prototype.addPlayer = function(player) {
	if(this.players.length < 2) {
		this.players.push(player);
	}
};

Board.prototype.isFull = function() {
	return this.players.length == 2;
};

Board.prototype.run = function() {
	setTimeout(this.distribution.bind(this), 1000);
	setInterval(this.update.bind(this), 10000);
};

Board.prototype.update = function() {
};

Board.prototype.distribution = function() {
	for(var i=0;i<this.players.length;i++) {
		var player = this.players[i];
		for(var j=0;j<7;j++) {
			var card =	player.deck.pop();
			player.hand.push(card);
		}
	}
	this.phase = Phase.DISTRIBUTION;
	var event = {};
	event.type = GameEvent.DISTRIBUTION;
	event.data = this.players;
	this.notify(event);
};

Board.prototype.allDistribDone = function() {
	for(var i = 0; i<this.players.length;i++) {
		if(this.players[i].doneDistrib == false) 
			return false;
	}
	return true;
}

Board.prototype.poseCard = function(player, card) {
	player.poseCard(this,card);
};

Board.prototype.letPlayerDoSth = function() {
	this.timerId = setTimeout(this.noReponse.bind(this), 5000);
	//this.beginTimer();
	this.mode = Mode.WAIT_PLAYER;
};

Board.prototype.noReponse = function() {
	this.resolveStack();
};

Board.prototype.pauseTimer = function() {
	clearTimeout(this.timerId);
};

Board.prototype.containsTypeInStack = function(type) {
	for(var i=0;i<this.stack.length;i++) {
		var element = this.stack[i];
		if(element.typeC == type) {
			return true;
		}
	}
	return false;
};

Board.prototype.checkTriggeredCapacities = function(trigger, card) {
	for(var i=0;i<this.players[i];i++) {
		var battlefield = this.players[i].battlefield;
		for(var j=0;j<battlefield.length;j++) {
			if(!element.capacities[i].hasMana()) {
				battlefield[j].execute({board:this,action:trigger,card:card});
			}
		}
	}
};

Board.prototype.resolveStack = function() {
	var element = this.stack.pop();
	if(element != null) {
		if(element.typeC == TypeCard.CREATURE) {
			element.executeCapacityActive({});
			element.onEnterBattlefield();
			var event = {};
			event.type = GameEvent.ENTER_BATTLEFIELD;
			event.data = {card:element};
			this.notify(event);
		}
		else if(element.type == TypeCard.CAPACITY) {
			element.execute({board:this});
		}
	}
};

Board.prototype.retirerCard = function(player, cards) {
	if(cards.length == 0) {
		var event = {};
		event.type = GameEvent.ERROR;
		event.data = "vous devez selectionner une carte a retirer";
		this.notify(event);
		return;
	}
	else {
		player.hand.removeByValues(cards);
		var event = {};
		event.type = GameEvent.RETIRER_CARD_OK;
		event.data = {player:player,cards:cards};
		this.notify(event);
	}
};

Board.prototype.isPlayerActif = function(player) {
	return this.players[this.playerActif].name == player.name;
};

Board.prototype.endOfTurn = function(player) {
	var event = {};
	if(this.phase == Phase.DISTRIBUTION) {
		player.doneDistrib = true;
		for(var i=0;i<this.players.length;i++){
			if(!this.players[i].doneDistrib) {
				return;
			}
		}
		this.nextPhase();
	}
};

Board.prototype.getPlayerWithToken = function() {
	return this.players[this.token];
};

Board.prototype.passer = function(player) {
	if(player.passer) {
		var event = {};
		event.type = GameEvent.ERROR;
		event.data = "vous avez deja passe";
		this.notify(event);
		return;
	}
	if(this.getPlayerWithToken().name != player.name) {
		var event = {};
		event.type = GameEvent.ERROR;
		event.data = "action interdite";
		this.notify(event);
		return;
	}
	player.passer = true;
	this.token = (this.token +1) % 2;
	for(var i=0;i<this.players.length;i++){
		if(!this.players[i].passer) {
			return;
		}
	}
	for(var i=0;i<this.players.length;i++){
		this.players[i].passer = false;

	}
	this.nextPhase();
};

//ACTION DE DEBUT POUR CHAQUE PHASE

Board.prototype.whoBeginsPhase = function() {
	var event = {};
	this.playerActif = 1;//Math.floor((Math.random() * 10))%2;
	this.token = 1;
	this.players[this.playerActif].canPioche = false;
	event.type = GameEvent.WHO_BEGIN;
	event.data = this.playerActif;
	this.notify(event);
	setTimeout(this.nextPhase.bind(this), 2000);
};

Board.prototype.degagementPhase = function(isFirst) {
	if(isFirst) {
		this.nextPhase();
	}
};

Board.prototype.entretienPhase = function(isFirst) {
	if(isFirst) {
		this.nextPhase();
	}
};

Board.prototype.piochePhase = function() {
	if(!this.players[this.playerActif].canPioche) {
		this.players[this.playerActif].canPioche = true;
		this.nextPhase();
	}
	else {
		var player = this.getPlayerActif();
		player.pioche(this);
	};
};


Board.prototype.nettoyagePhase = function() {
	if(this.getPlayerActif().hand.length > 7) {
		this.sousEtape = SousEtape.RETIRER_CARD;
		var event = {};
		event.type = GameEvent.RETIRER_CARD;
		this.notify(event);
	}
	else {
		this.nextPlayer();
		this.degagementPhase(true);
	}
};

Board.prototype.nextPhase = function() {
	if(this.phase == Phase.DISTRIBUTION) {
		this.phase = Phase.WHO_BEGINS;
		this.etape = Etape.IDLE;
		this.whoBeginsPhase();
	}
	else if(this.phase == Phase.WHO_BEGINS) {
		this.phase = Phase.DEBUT;
		this.etape = Etape.DEGAGEMENT;
		this.degagementPhase(true);
	}
	else if(this.phase == Phase.DEBUT) {
		if(this.etape == Etape.DEGAGEMENT) {
			this.etape = Etape.ENTRETIEN;
			this.entretienPhase(true);
		}	
		else if(this.etape == Etape.ENTRETIEN) {
			this.etape = Etape.PIOCHE;
			this.piochePhase();
		}
		else if(this.etape == Etape.PIOCHE) {
			this.phase = Phase.PRINCIPALE;
			this.etape = Etape.IDLE;
		}
	}
	else if(this.phase == Phase.PRINCIPALE) {
		this.phase = Phase.COMBAT;
		this.etape = Etape.DEBUT_COMBAT;
	}
	else if(this.phase == Phase.COMBAT) {
		if(this.etape == Etape.DEBUT_COMBAT)
			this.etape = Etape.DECLARATION_ATTAQUANTS;
		else if(this.etape == Etape.DECLARATION_ATTAQUANTS)
			this.etape = Etape.DECLARATION_BLOQUEURS;
		else if(this.etape == Etape.DECLARATION_BLOQUEURS) {
			this.etape = Etape.ATTRIBUTION_BLESSURES;
			setTimeout(this.nextPhase.bind(this), 1000);
		}		
		else if(this.etape == Etape.ATTRIBUTION_BLESSURES) {
			this.phase = Phase.PRINCIPALE_2;
			this.etape = Etape.IDLE;
		}	
	}
	else if(this.phase == Phase.PRINCIPALE_2) {
		this.phase = Phase.FIN;
		this.etape = Etape.FIN;
	}
	else if(this.phase == Phase.FIN) {
		if(this.etape == Etape.FIN) {
			this.etape = Etape.NETTOYAGE;
			setTimeout(this.nextPhase.bind(this), 1000);
		}
		else if(this.etape == Etape.NETTOYAGE) {
			this.phase = Phase.DEBUT;
			this.etape = Etape.DEGAGEMENT;
			this.nettoyagePhase();
		}
	}
};

Board.prototype.nextPlayer = function() {
	this.playerActif = (this.playerActif +1) % this.players.length;
};

Board.prototype.getPlayerActif = function() {
	return this.players[this.playerActif];
};

Board.prototype.muligane = function(player) {
	player.muligane();
};

Board.prototype.getBloqueur = function() {
	return this.players[(this.playerActif +1) % this.players.length];
};

Board.prototype.attributionBlessures = function() {
	if(attaquants.length == 0) {
		this.nextPhase();
	}
	else {
		var attaquant = this.attaquants.pop();
		attaquant.attack(this.getBloqueur());
		setTimeout(this.attributionBlessures.bind(this), 5000);
	}
};