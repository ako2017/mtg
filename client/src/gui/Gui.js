Gui = function () {
	this.gameController = null;
	this.actionGui = null;
};

Gui.prototype.constructor = Gui;

Gui.prototype.createActionCard = function(card) {
	var actionGui = $('<div/>').attr('class','gui-panel');
	var info = $('<button>info</button>').attr('class','gui-button').attr('class','info');
	var pose = $('<button>pose</button>').attr('class','gui-button').attr('class','pose');
	actionGui.append(info);
	actionGui.append(pose);
	actionGui.css('top', card.y+'px');
	actionGui.css('left', card.x+'px');
	$("#game-area").append(actionGui);
	this.actionGui = actionGui;
}

Gui.prototype.showError = function(error) {
	$('#error').text(error);
}

Gui.prototype.showPhase = function(id) {
	$('#phase').text(phaseMapping[id]);
}

Gui.prototype.showActionCard = function(card) {
	if(this.actionGui) {
		this.actionGui.css('top', card.y+'px');
		this.actionGui.css('left', card.x+'px');		
	}
	else {
		this.createActionCard(card);
	}
	this.actionGui.show();
	var gameController = this.gameController;
	var actionGui = this.actionGui;
	this.actionGui.find( ".pose" ).unbind('click').click(function() {
		gameController.poseCard(card.playerModel, card.cardModel);
		actionGui.hide();
	});
}


Gui.prototype.hideActionCard = function() {
	this.actionGui.hide();
}

Gui.prototype.generateButton = function() {
	for(var i=0;i<2;i++) {
		this.guiFor(this.gameModel.players[i]);	
		var test = $('<div></div>');
		$("#gui").before(test);
	}
}

Gui.prototype.generateInfoLabel = function() {
	var test = $('<div>phase</div>').attr('id','phase');
	$("#gui").before(test);
	var test = $('<div>error</div>').attr('id','error');
	$("#gui").before(test);
}

Gui.prototype.guiFor = function(player) {
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