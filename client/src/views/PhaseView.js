PhaseView = function(game, board) {
	Phaser.Sprite.call(this, game);
	this.board = board;
	this.init();
};

PhaseView.prototype = Object.create(Phaser.Sprite.prototype);
PhaseView.prototype.constructor = PhaseView;

PhaseView.prototype.init = function() {
	this.style = { font: "20px Arial", fill: "#f00"};
	//this.playerActifLabel= this.game.add.text(0, 0, "JOUEUR ACTIF: ", this.style);
	this.phaseLabel= this.game.add.text(0, 20, "PHASE: ", this.style);
	this.etapeLabel= this.game.add.text(0, 40, "ETAPE: ", this.style);
	this.addChild(this.phaseLabel);
	this.addChild(this.etapeLabel);
};

/**
 * Automatically called by World.update
 */
PhaseView.prototype.update = function() {
	this.phaseLabel.setText("PHASE: " + getPhaseName(this.board.phase));
	this.etapeLabel.setText("ETAPE: " + getEtapeName(this.board.etape));
};