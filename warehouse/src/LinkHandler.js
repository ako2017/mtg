/**
 * Repésente le gestionnaire de création de liens
 */
class LinkHandler {

	constructor(game) {
        this.game = game;
        this.sourceNode = null;
        this.destNode = null;
        this.poolInput = this.game.add.group();
        this.poolInput.createMultiple(4,'input');
        this.poolOutput = this.game.add.group();
        this.poolOutput.createMultiple(4,'output');
	}

    onClick(node) {
        this.showIO(node);
        if(this.sourceNode != null) {
            var dist = Phaser.Math.distance(this.sourceNode.x, this.sourceNode.y,node.x, node.y);
            var deg = Phaser.Math.radToDeg(Phaser.Math.angleBetween(this.sourceNode.x, this.sourceNode.y,node.x, node.y));
            var line = this.game.add.tileSprite(this.sourceNode.x, this.sourceNode.y, dist, 5, 'line');
            line.angle = deg;
            this.sourceNode = null;
            this.poolInput.forEachAlive(this.destroy,this);
            this.poolOutput.forEachAlive(this.destroy,this);
        }
        else {
            this.sourceNode = node;
        }
    }

    onOver(node) {
        if(this.sourceNode != null) {
            this.showIO(node);
        }
    }

    destroy(node) {
        node.kill();
    }

    onOverArrow(arrow) {
        arrow.scale.set(2);
    }

    onOutArrow(arrow) {
        arrow.scale.set(1);
    }

    showIO(node) {
        var input = this.poolInput.getFirstDead();
        if(input != null) {
            input.reset();
            input.inputEnabled  = true;
            input.input.enableDrag(true);
            input.events.onInputOver.add(this.onOverArrow, this);
            input.events.onInputOut.add(this.onOutArrow, this);

            input.x = node.x-node.width/2-10;
            input.y = node.y;
        }
        var output = this.poolOutput.getFirstDead();
        if(output != null) {
            output.reset();
            output.inputEnabled  = true;
            output.events.onInputOver.add(this.onOverArrow, this);
            output.events.onInputOut.add(this.onOutArrow, this);
            output.x = node.x+node.width/2;
            output.y = node.y;
        }
    }

} 