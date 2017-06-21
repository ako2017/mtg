PlayerStateView = function(game, player) {
	Phaser.Sprite.call(this, game);
	this.player = player;
	this.init();
};

PlayerStateView.prototype = Object.create(Phaser.Sprite.prototype);
PlayerStateView.prototype.constructor = PlayerStateView;

PlayerStateView.prototype.init = function() {
	this.charac = this.game.make.sprite(0, 0, this.player.avatar);
	this.style = {
		font : "20px Arial",
		fill : "#f00"
	};
	this.life = this.game.add.text(0, 0, "20 ", this.style);
	this.charac.scale.set(0.5,0.5);
	this.addChild(this.charac);
	this.addChild(this.life);
//	this.scale.set(0.5,0.5);
};

/**
 * Automatically called by World.update
 */

PlayerStateView.prototype.update = function() {
};