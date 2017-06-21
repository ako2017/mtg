IAPlayer = function (board) {
	this.board = board;
	this.player = board.players[0];
	this.state = 0;
	this.wait = 0;
};

IAPlayer.prototype.update = function(delta) {
	this.wait +=delta;
	if(this.wait > 3000 && this.state == 0 && this.board.phase == Phase.DISTRIBUTION) {
		this.wait=0;
		this.board.muligane(this.player);
		this.state = 1;
	}
	if(this.wait > 3000 && this.state == 1 && this.board.phase == Phase.DISTRIBUTION) {
		this.wait=0;
		this.board.endOfTurn(this.player);
		this.state = 2;
	}
	if( this.board.phase == Phase.PRINCIPALE && this.board.etape == Etape.IDLE && this.board.getPlayerWithToken().name == this.player.name) {
		this.board.pass(this.player);
	}
	if( this.board.phase == Phase.COMBAT && this.board.etape == Etape.DEBUT_COMBAT && this.board.getPlayerWithToken().name == this.player.name) {
		this.board.pass(this.player);
	}
	if( this.board.phase == Phase.COMBAT && this.board.etape == Etape.DECLARATION_ATTAQUANTS && this.board.getPlayerWithToken().name == this.player.name) {
		this.board.pass(this.player);
	}
	if( this.board.phase == Phase.COMBAT && this.board.etape == Etape.DECLARATION_BLOQUEURS && this.board.getPlayerWithToken().name == this.player.name) {
		this.board.pass(this.player);
	}
	if( this.board.phase == Phase.PRINCIPALE_2 && this.board.etape == Etape.IDLE && this.board.getPlayerWithToken().name == this.player.name) {
		this.board.pass(this.player);
	}
	if( this.board.phase == Phase.FIN && this.board.etape == Etape.FIN && this.board.getPlayerWithToken().name == this.player.name) {
		this.board.pass(this.player);
	}
};