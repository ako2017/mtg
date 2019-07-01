/**
 * Repésente un lien enter 2 noeuds
 */
class TapisRoulant extends Link {

	constructor(game, nodeA, nodeB) {
		super(game, nodeA, nodeB);
		this.items = [];
	}

	update() {

	}

	addItem(item) {
		this.item.push(item);
	}

	transfertItem() {
		
	}

} 