/**
 * Repésente un noeud
 */
class Gui  {

	constructor(game) {
        this.game = game;
        this.infoView = null;

    }

    init() {
        this.infoView = new InfoView(this.game);
        this.infoView.visible=false;
    }

} 