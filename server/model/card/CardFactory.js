const cst = require('../Constantes');
const Card = require('./Card');
const Capacity = require('./capacity/Capacity');
const AddLifeEffect = require('./capacity/effect/AddLifeEffect');

class CardFactory {

	create(cardId) {
		var card = new Card();
		card.force = 0;
		card.endurance = 0;
		card.mana = [1,0,0,0,0,0];
		card.type = cst.TypeCard.CREATURE;
		var capacity = new Capacity([0,0,0,0,0,0], function(trigger,source) {return trigger == cst.GameEvent.ON_ENTER_BATTLEFIELD});
		capacity.addEffect(new AddLifeEffect(10));
		card.addCapacity(capacity);
		return card;
	}
}

module.exports = CardFactory;