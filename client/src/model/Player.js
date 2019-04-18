/**
 * Classe représentant un joueur.
 * Elle contient son deck ainsi que chaque zone où une carte se trouve ainsi que son comteur de vie
 */
class Player extends Observable {
	constructor() {
		super();
		this.hand = [];
		this.battlefield = [];
		this.terrains = [];
		this.deck = [];
		this.cemetery = [];
		this.exil = [];
		this.life = 3;
		this.mana=[0,0,0,0,0,0];
		this.name = "";
		this.doneDistrib = false;
		this.hasPoseTerrain = false;
		this.canPioche = true;
		this.attaquants = [];
		this.hasPass = false;
		this.avatar = "";
		this.game = null;
		this.uid = UID++;
	}

	/**
	 * Permet au jour de passer son tour
	 * @returns true si c'est la première fois que l'on passe dans le tour false sinon
	 */
	pass() {
		if(this.hasPass) return false;
		this.hasPass = true;
		return false;
	}

	/**
	 * Vérifie si on a assez de mana pour payer le coût en paramètre
	 * @param {Array} mana le coût à payer
	 * @returns true si on peut payer false sinon
	 */
	canPayMana(mana) {
		for(var i=0;i<mana.length;i++) {
			if(this.mana[i] < mana[i])
				return false;
		}
		return true;
	}

	/**
	 * Paye le coût de mana en paramètre
	 * @param {Array} mana le coût de mana
	 * @returns true si on a payé false sinon
	 */
	payMana(mana) {
		if(!this.canPayMana(mana)) return false;
		for(var i=0;i<mana.length;i++) {
			this.mana[i] = this.mana[i] - mana[i];
		}
		sendEvent(GameEvent.UPDATE_MANA,this,this);
		return true;
	}

	/**
	 * Effectue un dégagement de toutes les cartes engagées du joueur
	 * @returns true si au  moins une carte a été dégagée false sinon
	 */
	degagement() {
		var doDegagement = false;
		this.battlefield.forEach(function(card, index) {
			if(card.degage()) doDegagement = true;
		});
		
		this.terrains.forEach(function(card, index) {
			if(card.degage()) doDegagement = true;
		});
		return doDegagement;
	}

	/**
	 * Permet au joueur de piocher la carte du dessus de son deck
	 * @return la carte piochée ou null si le deck est vide
	 */
	pioche() {
		if(this.deck.length == 0) return null;
		var card = this.deck.pop();
		this.hand.push(card);
		sendEvent(GameEvent.PIOCHE_CARD,{player:this,card:card},this);
		return card;
	};

	/**
	 * 
	 * @param {Number} cardId 
	 * @returns la carte ayant le cardId
	 */
	getCardById(cardId) {
		for(var i=0;i<this.hand.length;i++) {
			if(this.hand[i].id == cardId) {
				return this.hand[i]
			}
		}
		return null;
	};

	/**
	 * Modifie le compteur de vie du joueur
	 * @param {Number} value la valeur à ajouter
	 */
	damage(value) {
		this.life += value;
		if(this.life < 0)
			this.life = 0;
		sendEvent(GameEvent.PLAYER_LIFE,this,this);
	};

	/**
	 * Retire une carte de la main du joueur
	 * @param {Card} card la carte à retirer
	 * @returns {boolean} true en cas de succès false sinon
	 */
	retirerCard(card) {
		var removedCard = this.hand.removeByValue(card);
		if(removedCard != null) {
			card.gotoCemetery();
			return true;
		}
		return false;
	};

	canPoseCard(card) {
		if(card.type == TypeCard.TERRAIN && this.hasPoseTerrain) {
			return this.error("vous ne pouvez poser qu'un terrain par tour");
		}
		else if(!this.canPayMana()) {
			return this.error("vous n'avez pas assez de mana");
		}
	}

	/**
	 * Pose une carte si on  a assez de mana
	 * @param {Card} card  la carte à poser
	 * @param {Stack} stack la carte est mise sur la pile dan certains cas
	 * @returns {boolean} true en cas de succès false sinon
	 */
	poseCard(card,stack) {
		if(!this.canPoseCard(card)) return false;
		player.payMana(card.mana);
		if(card.type == TypeCard.TERRAIN) {
			this.hasPoseTerrain = true;
			this.terrains.push(card);
			this.hand.removeByValue(card);
			sendEvent(GameEvent.POSE_TERRAIN,{player:this,card:card},this);
		}
		else if(card.type == TypeCard.CAPACITY){
			stack.push(card);
		}
		else {
			this.hand.removeByValue(card);
			stack.push(card);
		}
		return false;
	};

	/**
	 * Déclare la carte comme attaquant
	 * @param {Card} card la carte attaquante
	 * @returns {boolean} true si ok false sinon
	 */
	declareAttaquant(card) {
		if(!card.canAttaque()) {
			return false;
		}
		card.engage();
		this.attaquants.push(card);
		var event = {};
		event.type = GameEvent.DECLARE_ATTAQUANT;
		event.data = card;
		this.notify(event);
		return true;
	}

	/**
	 * Engage la carte sélectionnée si elle n'est pas déjà engagée
	 * @param {Card} card la carte à engager
	 * @returns {boolean} true en cas de succès false sinon
	 */
	engage(card) {	
		if(!card.engage())
			return false;
		if(card.owner == this) {
			addMana(card.mana,this.mana);
			sendEvent(GameEvent.UPDATE_MANA,this,this.game);
		}
		return true;
	}

	/**
	 * Appelé lors de l'exécution d'un nouveau tour de jeu pour ce joueur.
	 * Cette méthode réinitialise certains attributs.
	 */
	newTurn() {
		this.attaquants.length=0;
		this.hasPoseTerrain = false;
		this.battlefield.forEach(function(card, index) {
			card.malInvocation = false;
			card.restaure();
		});
		//on remet le compteur à 0
		for(var i=0;i<this.mana.length;i++)
			this.mana[i] = 0;
		sendEvent(GameEvent.RESTAURE_MAL_INVOCATION,this.battlefield,this);
	}

	/**
	 * Déclare un bloqueur sur un attaquant
	 * @param {Card} bloqueur le bloqueur est une carte que vous possédez
	 * @param {Card} attaquant l'attaquant est une carte adverse
	 */
	declareBloqueur(bloqueur, attaquant) {
		if(bloqueur.owner != this || attaquant.owner == this) 
			return false;
		attaquant.blockedBy = bloqueur;
		bloqueur.blockCard = attaquant;
		sendEvent(GameEvent.DECLARE_BLOQUEUR,attaquant,this);
	}

	/**
	 * Vérifie si un muligane est possible
	 * @returns {boolean} true si succès false sinon
	 */
	canMuligane() {
		return this.hand.length>1;
	}

	/**
	 * Effectue un muligane 
	 * @returns {boolean} true si succès false sinon
	 */
	muligane() {
		if(!this.canMuligane()) return false;
		var nbCard = this.hand.length-1;
		for(var i=0;i<this.hand.length;i++) {
			this.deck.push(this.hand[i]);
		}
		this.hand = [];
		for(var i=0;i<nbCard;i++) {
			this.hand.push(this.deck.pop());
		}
		sendEvent(GameEvent.MULIGANE,this,this.game);
		return true;
	}
}