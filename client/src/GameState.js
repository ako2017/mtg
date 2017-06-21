gameState = function(game){
	this.ia = null;
}
 
gameState.prototype = {
  	create: function(){
			var view = new BoardView(this.game,board,new GameCtrl(board), 'pau');
			board.addObserver(view);
			this.createIA(board);
			this.game.add.existing(view);
			board.run();
			this.game.scale.startFullScreen(false);	
	},
	createIA: function() {
		this.ia = new IAPlayer(board);
	},
	update:function(){
		this.ia.update(this.game.time.elapsedMS);
	}
}