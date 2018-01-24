GuiView = function () {
	this.gameModel = null;
	this.controller = null;
	this.gameView = null;
};

GuiView.prototype.constructor = GuiView;

GuiView.prototype.init = function() {
	this.registerObserver();
	this.generateButton();
	this.generateInfoLabel();
}

GuiView.prototype.generateButton = function() {
	for(var i=0;i<2;i++) {
		this.guiFor(this.gameModel.players[i]);	
		var test = $('<div></div>');
		$("#gui").before(test);
	}
}

GuiView.prototype.generateInfoLabel = function() {
	var test = $('<div>phase</div>').attr('id','phase');
	$("#gui").before(test);
	var test = $('<div>error</div>').attr('id','error');
	$("#gui").before(test);
}


GuiView.prototype.registerObserver = function() {
	this.gameModel.pm.addObserver(this);
	for(var i=0;i<this.gameModel.players.length;i++) {
		this.gameModel.players[i].addObserver(this);
		for(var j=0;j<this.gameModel.players[i].deck.length;j++) {
			var card = this.gameModel.players[i].deck[j];
			this.gameModel.players[i].addObserver(this);
		}
	}	
};

GuiView.prototype.guiFor = function(player) {
	var controller = this.controller;
	var gameView  = this.gameView;
	var test = $('<button>muligane</button>').click(function () {
		controller.muligane(player);
    }).attr('id','m_'+player.name);
    $("#gui").before(test);
	var test = $('<button>pose</button>').click(function () {
		var selected = null;
		$.each(gameView.playersView[player.name].hand, function( index, value ) {
			  if(value.isSelected) {
				  selected = value;
				  return false;
			  }
			});
		controller.poseCard(player, selected.cardModel);
    }).attr('id','p_'+player.name);
    $("#gui").before(test);
    test = $('<button>valid</button>').click(function () {
    	controller.valid(player);
    }).attr('id','v_'+player.name);
    $("#gui").before(test);
}

GuiView.prototype.onReceive = function(event) {
	switch(event.type) {
		case GameEvent.ERROR:
			$('#error').text(event.data);
		break;	
		case GameEvent.CHANGE_PHASE:
			$('#phase').text(phaseMapping[event.data]);
		break;
	}
};

var phaseMapping = [];

phaseMapping[PHASE.DISTRIBUTION] ="DISTRIBUTION";
phaseMapping[PHASE.WHO_BEGINS] = "WHO_BEGINS";
phaseMapping[PHASE.DEGAGEMENT] = "DEGAGEMENT";
phaseMapping[PHASE.ENTRETIENT] = "ENTRETIENT";
phaseMapping[PHASE.PIOCHE] = "PIOCHE";
phaseMapping[PHASE.PRINCIPALE] = "PRINCIPALE";
phaseMapping[PHASE.DECLARATION_ATTAQUANT] = "DECLARATION_ATTAQUANT";
phaseMapping[PHASE.DECLARATION_BLOQUEUR] = "DECLARATION_BLOQUEUR";
phaseMapping[PHASE.ATTRIBUTION_BLESSURE] = "ATTRIBUTION_BLESSURE";
phaseMapping[PHASE.FIN] = "FIN";
phaseMapping[PHASE.NETTOYAGE] = "NETTOYAGE";