preloadState = {
	preload: function(){ 
		this.game.plugins.add(PhaserInput.Plugin);
		for(var i=0;i<cardBdd.length;i++) {
			this.game.load.image(cardBdd[i].extension + '#' + cardBdd[i].numero, 'assets/extensions/'+cardBdd[i].extension+'/'+addzeros(cardBdd[i].numero,3)+'.png');
		}
		this.game.load.image('back', 'assets/back.png');
		this.game.load.image('avatar1', 'assets/avatar1.jpg');
		this.game.load.image('avatar2', 'assets/avatar2.jpg');
		this.game.load.image('line', 'assets/line.png');
		this.game.load.image('titleBg', 'assets/bg.jpg');
		this.game.load.image('logo', 'assets/logo-magic.png');
		this.game.load.image('fond', 'assets/fond.jpg');
		this.game.load.image('cross', 'assets/cross.png');
		this.game.load.video('video', 'assets/defkp_EMN_Header_41.mp4');
		var buttonImage = this.game.add.bitmapData(100, 20);
        buttonImage.ctx.fillStyle = '#e6dec7';
        buttonImage.ctx.strokeStyle = '#35371c';
        buttonImage.ctx.lineWidth = 4;
        buttonImage.ctx.fillRect(0, 0, 100, 20);
        buttonImage.ctx.strokeRect(0, 0, 100, 20);
        this.game.cache.addBitmapData('buttonsmall', buttonImage);
		var tokenImage = this.game.add.bitmapData(20, 20);
		tokenImage.ctx.fillStyle = '#e6dec7';
		tokenImage.ctx.strokeStyle = '#35371c';
		tokenImage.ctx.lineWidth = 4;
		tokenImage.ctx.fillRect(0, 0, 20, 20);
		tokenImage.ctx.strokeRect(0, 0, 20, 20);
        this.game.cache.addBitmapData('token', tokenImage);
        var actifImage = this.game.add.bitmapData(20, 20);
        actifImage.ctx.fillStyle = '#ff00c7';
        actifImage.ctx.strokeStyle = '#35371c';
        actifImage.ctx.lineWidth = 4;
        actifImage.ctx.fillRect(0, 0, 20, 20);
        actifImage.ctx.strokeRect(0, 0, 20, 20);
        this.game.cache.addBitmapData('actif', actifImage);
        var bandeauImage = this.game.add.bitmapData(800, 5);
        bandeauImage.ctx.fillStyle = '#e6dec7';
        bandeauImage.ctx.strokeStyle = '#35371c';
        bandeauImage.ctx.lineWidth = 4;
        bandeauImage.ctx.fillRect(0, 0, 800, 5);
        //actifImage.ctx.strokeRect(0, 0, 20, 20);
        this.game.cache.addBitmapData('bandeau', bandeauImage);
	},
  	create: function(){
		this.game.state.start("MainMenu");
	}
}