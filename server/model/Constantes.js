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
	INIT : -5,
	CHANGE_PHASE : -4,
	ERROR : -3,
	WHO_BEGIN : -2,
	DISTRIBUTION : -1,
	POSE_CARD : 0,
	CHANGE_CARD : 1,
	POSE_CARD : 2,
	PIOCHE_CARD : 3,
	RETIRER_CARD : 4,
	RETIRER_CARD_VALID : 5,
	ENTER_BATTLEFIELD : 6,
	STACK_CARD : 7,
	ENGAGEMENT : 8,
	DEGAGEMENT : 9,
	DECLARE_BLOQUEUR : 10,
	MULIGANE : 11,
	STACK_CARD : 12,
	ON_DEATH : 13,
	ON_ENTER_BATTLEFIELD : 14,
	STATIC : 15,
	NEED_CIBLE : 16,
	POSE_TERRAIN : 17,
	NEXT_TOKEN : 18,
	GOTO_CEMETERY : 19,
	NEXT_PLAYER : 20,
	RESTAURE_BLOQUEURS : 21,
	DAMAGE : 22,
	PLAYER_LIFE : 23,
	UPDATE_MANA : 24,
	RESTAURE_MAL_INVOCATION : 25,
	ADD_PLAYER : 26,
	GAME_FULL : 27,
	MULIGANE_VALID : 28,
	ATTACK : 29,
	DECLARE_ATTAQUANT : 30,
	ATTACK_PLAYER : 31,
	MAL_INVOCATION : 32,
	WAIT_INFO : 33,
	CARD_DIE : 34,
	SHOW_PROMPT : 35
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
TimeToLive = {
	NONE : 0,
	EOT : 1,
	INF : 2
};

const
Capability = {
	VOL : 0,
	CELERITE : 1,
	VIGILANCE : 2
};

module.exports = {
	Capability : Capability,
	TimeToLive : TimeToLive,
	PHASE : PHASE,
	TypeMana : TypeMana,
	TypeCard : TypeCard,
	GameEvent :  GameEvent
};