Array.prototype.removeByValue = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) {
			this.splice(i, 1);
			break;
		}
	}
}

Array.prototype.removeByValues = function(val) {
	for (var i = 0; i < val.length; i++) {
		this.removeByValue(val[i]);
	}
}

function addzeros(number, length) {
	var num = '' + number;
	while (num.length < length) {
		num = '0' + num;
	}
	return num;
};

function addMana(source, dest) {
	for(var i=0;i<source.length;i++) {
		dest[i] += source[i];
	}
};

const
GameEvent = {
	CHANGE_PHASE : -6,
	ERROR : -5,
	WHO_BEGIN : -4,
	DISTRIBUTION : -3,
	POSE_CARD : 0,
	CHANGE_CARD : 1,
	POSE_CARD : 2,
	PIOCHE_CARD : 3,
	RETIRER_CARD : 4,
	RETIRER_CARD_OK : 5,
	ENTER_BATTLEFIELD : 6,
	STACK_CARD : 7,
	ENGAGEMENT : 8,
	DEGAGEMENT : 9,
	DECLARE_BLOQUEUR : 10,
	UNDECLARE_BLOQUEUR : 11,
	STACK_CARD : 12,
	ON_DEATH : 13,
	ON_ENTER_BATTLEFIELD : 14,
	STATIC : 15,
	NEED_CIBLE : 16,
	POSE_TERRAIN : 17,
	NEXT_TOKEN : 18
};

const
Duration = {
	WHO_BEGIN : 2000,
	DEGAGEMENT : 2000,
	ENTRETIENT : 2000,
	PIOCHE : 2000,
	DECLARATION_ATTAQUANT : 2000,
	DECLARATION_BLOQUEUR : 2000,
	ATTRIBUTION_BLESSURE : 2000,
	FIN: 2000,
	NETTOYAGE : 2000
};

const
CardEvent = {
	ENGAGEMENT : 0
};
const
State = {
	NEED_CIBLE : 0
};

const
TypeCard = {
	ARTEFACT : 0,
	CREATURE : 1,
	ENCHANTEMENT : 2,
	TERRAIN : 3,
	PLANES_WALKER : 4,
	EPHEMERE : 5,
	RITUEL : 6,
	CAPACITY : 7
};

const
TypeMana = {
	BLANC : 0,
	BLEU : 1,
	NOIR : 2,
	ROUGE : 3,
	VERT : 4,
	INCOLORE : 5
};
const
ManaSize = 5;

const
PHASE = {
	WAIT : -1,
	DISTRIBUTION : 0,
	WHO_BEGINS : 1,
	DEGAGEMENT : 2,
	ENTRETIENT : 3,
	PIOCHE : 4,
	PRINCIPALE : 5,
	DECLARATION_ATTAQUANT : 6,
	DECLARATION_BLOQUEUR : 7,
	ATTRIBUTION_BLESSURE : 8,
	FIN : 9,
	NETTOYAGE : 10
};


const
Ttl = {
	NONE : 0,
	EOT : 1,
	INF : 2
};

const
Capacity = {
	VOL : 0,
	CELERITE : 1,
	VIGILANCE : 2
};