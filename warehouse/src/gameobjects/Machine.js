/**
 * Repésente un noeud
 */
class Machine extends Phaser.Sprite {

	constructor(game, image) {
		super(game,0,0,image);
		this.anchor.set(0.5,0.5);
		this.inputs = [];
		this.outputs = [];
		this.inputEnabled  = true;
        this.input.enableDrag();

		this.name = this.addChild(this.game.add.text(0, this.height/2, this.constructor.name.toLowerCase(), { font: '12px Arial Black',fill: '#fff',strokeThickness: 4 }));
		this.name.anchor.set(0.5,0.5);
	}

	addInputNode(x,y,image,type) {
		var node = new Node(this.game, image, true, type);
		node.x  = x;
		node.y  = y;
		this.inputs.push(node);
		this.addChild(node);
	}

	addOutputNode(x,y,image,type) {
		var node = new Node(this.game, image, false, type);
		node.x  = x;
		node.y  = y;
		this.outputs.push(node);
		this.addChild(node);
	}

	isWorking() {
		for(var i = 0; i<this.inputs.length;i++)
			if(!this.hasInput(i)) return false;
		for(var i = 0; i<this.outputs.length;i++)
			if(!this.hasOutput(i)) return false;
		return true;
	}
	
	hasInput(id) {
		return this.inputs[id].link != null;
	}

	hasOutput(id) {
		return this.outputs[id].link != null;
	}

	onClick(event) {
		//$('#node-'+this.constructor.name.toLowerCase()).show();
	}

	update() {
		this.outputs.forEach(function(node){
			node.update();
		});
	}

} 