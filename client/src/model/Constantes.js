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

const
GameEvent = {
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
	STACK_CARD : 12
};

const
CardEvent = {
	ENGAGEMENT : 0
};
const
Mode = {
	WAIT_PLAYER : 0
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
Phase = {
	DISTRIBUTION : -2,
	WHO_BEGINS : -1,
	DEBUT : 0,
	PRINCIPALE : 1,
	COMBAT : 2,
	PRINCIPALE_2 : 3,
	FIN : 4
};
const
Etape = {
	IDLE : -1,
	DEGAGEMENT : 0,
	ENTRETIEN : 1,
	PIOCHE : 2,
	DEBUT_COMBAT : 3,
	DECLARATION_ATTAQUANTS : 4,
	DECLARATION_BLOQUEURS : 5,
	ATTRIBUTION_BLESSURES : 6,
	FIN : 7,
	NETTOYAGE : 8
};

const
SousEtape = {
	IDLE : -1,
	RETIRER_CARD : 0
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

function getPhaseName(phase) {
	switch (phase) {
	case Phase.DISTRIBUTION:
		return "DISTRIBUTION";
	case Phase.WHO_BEGINS:
		return "WHO_BEGINS";
	case Phase.DEBUT:
		return "DEBUT";
	case Phase.PRINCIPALE:
		return "PRINCIPALE";
	case Phase.COMBAT:
		return "COMBAT";
	case Phase.PRINCIPALE_2:
		return "PRINCIPALE_2";
	case Phase.FIN:
		return "FIN";
	}
}

function getEtapeName(etape) {
	switch (etape) {
	case Etape.IDLE:
		return "RIEN";
	case Etape.DEGAGEMENT:
		return "DEGAGEMENT";
	case Etape.ENTRETIEN:
		return "ENTRETIEN";
	case Etape.PIOCHE:
		return "PIOCHE";
	case Etape.DEBUT_COMBAT:
		return "DEBUT_COMBAT";
	case Etape.DECLARATION_ATTAQUANTS:
		return "DECLARATION_ATTAQUANTS";
	case Etape.DECLARATION_BLOQUEURS:
		return "DECLARATION_BLOQUEURS";
	case Etape.ATTRIBUTION_BLESSURES:
		return "ATTRIBUTION_BLESSURES";
	case Etape.FIN:
		return "FIN";
	case Etape.NETTOYAGE:
		return "NETTOYAGE";
	}
}