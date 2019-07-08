/**
 * Repésente le gestionnaire de création de liens
 */
class LinkHandler {

	constructor(game) {
        this.game = game;
        this.sourceNode = null;
        this.destNode = null;
	}

    onClick(node) {
        console.log(node.x);
        //this.game.add.sprite(node.x-node.width/2-10, node.y, 'input');
       // this.game.add.sprite(node.x+node.width/2, node.y, 'output');

        if(this.sourceNode != null) {
            var dist = Phaser.Math.distance(this.sourceNode.x, this.sourceNode.y,node.x, node.y);
            var deg = Phaser.Math.radToDeg(Phaser.Math.angleBetween(this.sourceNode.x, this.sourceNode.y,node.x, node.y));
            var line = this.game.add.tileSprite(this.sourceNode.x, this.sourceNode.y, dist, 5, 'line');
            line.angle = deg;
        }
        this.sourceNode = node;
    }

    onOver(node) {
    }

} 