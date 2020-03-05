/**
 * Repésente un noeud
 */
class InfoView extends Phaser.Group {

	constructor(game) {
        super(game);
        this.title = this.add(game.add.text(0, 0, 'INFORMATIONS', { font: '12px Arial Black',fill: '#fff',strokeThickness: 4 }));
        this.infos = this.add(game.add.text(0, 15, 'type : ', { font: '10px Arial Black',fill: '#fff',strokeThickness: 1 }));
        /*this.typeLabel = this.add(game.add.text(0, 10, 'type : ', { font: '10px Arial Black',fill: '#fff',strokeThickness: 1 }));
        this.typeValue = this.add(game.add.text(40, 10, '', { font: '10px Arial Black',fill: '#fff',strokeThickness: 1 }));*/
        //this.add(this.game.add.inputField(0, 60));
    }
    
    showMachine(machine) {
        this.infos.setText(machine.toString());
        this.visible=true;
    }

} 