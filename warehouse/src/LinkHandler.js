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

        this.cursorDrag = this.game.add.sprite(0, 0, 'billered');
        this.cursorDrag.inputEnabled = true;
        this.cursorDrag.input.enableDrag();
        this.cursorDrag.events.onDragStop.add(this.onDragStop, this);
        this.cursorDrag.anchor.set(0.5,0.5);
        this.nodeGroup = null;
    }
    
    onDragStop(sprite, pointer) {
        sprite.x=0;
        var triggerDistance = 20;
        var _this = this;

        var tmpArray = [];

        this.nodeGroup.forEachAlive(function(sprite) {     
            sprite.inputs.forEach(function(node) {
                tmpArray.push(node);
            });
            sprite.outputs.forEach(function(node) {
                tmpArray.push(node);
            });
        });

        tmpArray.forEach(function(sprite) {
            if (Phaser.Math.distance(sprite.world.x, sprite.world.y, pointer.x, pointer.y) <= triggerDistance) {
                // do something to this sprite, as it lies within the trigger distance  
                _this.destNode = sprite;
            }
        });
        if(this.sourceNode != null && this.destNode != null){
       
            if(this.sourceNode.type == this.destNode.type && this.sourceNode.isInput != this.destNode.isInput) {
                var nodeA = null;
                var nodeB = null;

                if(this.sourceNode.isInput) {
                    nodeA = this.destNode;
                    nodeB = this.sourceNode;
                }
                else {
                    nodeA = this.sourceNode;
                    nodeB = this.destNode;
                }

                var link = new Link(this.game, nodeA, nodeB);
                this.links.push(link);
                this.sourceNode.addLink(link);
                this.destNode.addLink(link);
            }    
        }
        this.sourceNode = null;
        this.destNode = null;
    }


    onUp(node, pointer) {
        this.cursorDrag.input.stopDrag(this.game.input.activePointer);      
    }

    onClick(node) {      
        if(this.sourceNode == null) {
            this.sourceNode = node;
            this.cursorDrag.x=node.world.x;
            this.cursorDrag.y=node.world.y;
            this.game.world.bringToTop(this.cursorDrag);
            this.cursorDrag.input.startDrag(this.game.input.activePointer);
        }
    }

    onOver(node) {
      /*  if(this.sourceNode != null) {
            if(this.destNode != null) {
                this.hideIO(this.destNode);
            }
            this.destNode = node;
            this.showIO(node);
        }*/
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
        if(this.line != null) {
            if(this.line.arrow != arrow && this.line.arrow.type != arrow.type) 
                alert("generate line");
            return;
        }
        this.line = this.game.add.tileSprite(arrow.x, arrow.y, 1, 3, 'line');
        this.line.arrow = arrow;
    }

    onMove(pointer,newX, newY, isClick) {
        if(this.line != null) {
            var dist = Phaser.Math.distance(this.line.x, this.line.y, newX, newY);
            var deg = Phaser.Math.radToDeg(Phaser.Math.angleBetween(this.line.x, this.line.y,newX, newY));
            this.line.angle = deg;
            this.line.width = dist;
        }
    }

} 