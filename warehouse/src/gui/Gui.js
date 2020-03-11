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
        this.panelMachine = new PanelMachine(this.game);
    }

    createPanelMachine() {
        
    }

} 