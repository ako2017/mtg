GuiView = function () {
	this.gameModel = null;
	this.controller = null;
	this.gameView = null;
};

GuiView.prototype.constructor = GuiView;

GuiView.prototype.init = function() {
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

};