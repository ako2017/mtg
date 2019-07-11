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
        this.line = null;
        this.game.input.addMoveCallback(this.onMove,this);
	}

    onClick(node) {      
        if(this.sourceNode == null) {
            this.sourceNode = node;
            this.showIO(node);
        }
        else if(this.sourceNode != node) {
//            this.poolInput.forEachAlive(this.destroy,this);
//           this.poolOutput.forEachAlive(this.destroy,this);
        }
    }

    onOver(node) {
        if(this.sourceNode != null) {
            if(this.destNode != null) {
                this.hideIO(this.destNode);
            }
            this.destNode = node;
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

    onClickArrow(arrow) {
        this.line = this.game.add.tileSprite(arrow.x, arrow.y, 1, 3, 'line');
    }

    onMove(pointer,newX, newY, isClick) {
        if(this.line != null) {
            var dist = Phaser.Math.distance(this.line.x, this.line.y, newX, newY);
            var deg = Phaser.Math.radToDeg(Phaser.Math.angleBetween(this.line.x, this.line.y,newX, newY));
            this.line.angle = deg;
            this.line.width = dist;
        }
    }

    showIO(node) {
        var input = this.poolInput.getFirstDead();
        node.arrow = [];
        if(input != null) {
            input.reset();
            input.inputEnabled  = true;
            input.events.onInputOver.add(this.onOverArrow, this);
            input.events.onInputOut.add(this.onOutArrow, this);
            input.events.onInputDown.add(this.onClickArrow, this);
            input.x = node.x-node.width/2-10;
            input.y = node.y;   
            node.arrow.push(input);    
        }
        var output = this.poolOutput.getFirstDead();
        if(output != null) {
            output.reset();
            output.inputEnabled  = true;
            output.events.onInputOver.add(this.onOverArrow, this);
            output.events.onInputOut.add(this.onOutArrow, this);
            output.events.onInputDown.add(this.onClickArrow, this);
            output.x = node.x+node.width/2;
            output.y = node.y;
            node.arrow.push(output);   
        }
    }

    hideIO(node) {
        for(let i=0;i<node.arrow.length;i++) {
            this.destroy(node.arrow[i]);
        }
    }

} 