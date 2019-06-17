class CardBuilder {
	constructor() {
		this.force = 0;
		this.endurance = 0;
		this.nom="nom";
		this.text="descriptif de la carte";
		this.mana= [];
		this.owner = player;
		this.typeLabel="type de la carte";
		this.type=null;
		this.frontPic = "";
		this.isEngaged = false;
		this.vol = false;
		this.celerite = false;
		this.vigilance = false;
		this.capacities = [];
	}

    build() {
        
    }
}

module.exports = CardBuilder;