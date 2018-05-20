GameController = function(model) {
	this.gameModel = model;
};

GameController.prototype.declareAttaquant = function(cardModel) {
	this.gameModel.declareAttaquant(this.gameModel.getPlayerActif(), cardModel);
};

GameController.prototype.isCurrentPhase = function(phase) {
	return this.gameModel.pm.isCurrentPhase(phase);
};

GameController.prototype.hasDonedeclaration = function() {
	return this.gameModel.pm.currentPhase.hasDonedeclaration;
};

GameController.prototype.getPlayerNonActif = function() {
	return this.gameModel.getPlayerNonActif();
};

GameController.prototype.getPlayerActif = function() {
	return this.gameModel.getPlayerActif();
};

GameController.prototype.valid = function(player) {
	return this.gameModel.valid(player);
};

GameController.prototype.muligane = function(player) {
	return this.gameModel.muligane(player);
};

GameController.prototype.poseCard = function(player, card) {
	this.gameModel.poseCard(player,card);
	this.view.actionCardGroup.visible = false;
};

GameController.prototype.declareAttaquantOrBloqueur = function(cardModel) {
	if(this.isCurrentPhase(PHASE.DECLARATION_BLOQUEUR)) {
		if(!this.view.bloqueur) {
			this.view.bloqueur = cardModel;
			this.view.showError('veuillez selectionner une creature a bloquer');
			this.view.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
				this.view.showError("");
			}, this);
			return;
		}
		else if(!this.getPlayerNonActif().declareBloqueur(this.view.bloqueur, cardModel)) {
				this.showError('probleme dans le bloqueur ou attaquant, recommencez');
		}
		this.view.bloqueur = null;
	}
	else if(this.isCurrentPhase(PHASE.DECLARATION_ATTAQUANT)) {
		this.declareAttaquant(cardModel);
	}
};

GameController.prototype.retirerCard = function(player, card) {
	this.gameModel.retirerCard(player,card);
	this.view.actionCardGroup.visible = false;
};

GameController.prototype.engage = function(player, card) {
	player.engage(card);
};

