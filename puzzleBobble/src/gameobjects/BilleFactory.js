/**
 * Repésente une bille
 */
class BilleFactory {

	static create(game, type) {
		switch(type) {
			case 0:
				return new Bille(game, 'billered',type); 
			case 1:
				return new Bille(game, "billegreen",type); 
			case 2:
				return new Bille(game, "billeblue",type); 
		}
	}

} 