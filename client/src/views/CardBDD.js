var cardTable = [
    {
        extension : 0,
        numero : 1,
        force : 5,
        endurance : 1,
        nom:"nom",
        text:"descriptif de la carte",
        mana: [1,0,0,0,0,0],
        typeLabel:"type de la carte",
        type:1,// TypeCard.CREATURE,
        vol : false,
        celerite : false,
        vigilance : false,
        capacities : [{
            mana : [0,0,0,0,0,0],
            action : "console.log('je suis dans le champs de bataille');this.card.owner.game.getPlayerNonActif().damage(0);",
            trigger : "trigger == GameEvent.ON_ENTER_BATTLEFIELD && source == this.card;"
        }]
    },
    {
        extension : 0,
        numero : 21,
        force : 0,
        endurance : 0,
        nom:"nom",
        text:"descriptif de la carte",
        mana: [1,0,0,0,0,0],
        typeLabel:"type de la carte",
        type:3,// TypeCard.TERRAIN,
        vol : false,
        celerite : false,
        vigilance : false,
        capacities : [{
            mana : [1,0,0,0,0,0],
            action : "alert('test21');",//action : "alert('test21');ctx.game.players[0].name='lala'"
            cible : null
        }]
    },
    {
        extension : 0,
        numero : 2,
        force : 5,
        endurance : 1,
        nom:"nom",
        text:"descriptif de la carte",
        mana: [1,0,0,0,0,0],
        typeLabel:"type de la carte",
        type:5,// TypeCard.EPHEMERE,
        vol : false,
        celerite : false,
        vigilance : false,
        capacities : [{
            mana : [1,0,0,0,0,0],
            action : "alert('test2');",
            cible : null
        }]
    },
    {
        extension : 0,
        numero : 3,
        force : 5,
        endurance : 1,
        nom:"nom",
        text:"descriptif de la carte",
        mana: [1,0,0,0,0,0],
        typeLabel:"type de la carte",
        type:5,// TypeCard.EPHEMERE,
        vol : false,
        celerite : false,
        vigilance : false,
        capacities : [{
            mana : [0,0,0,0,0,0],
            action : "console.log('test carte2')",
            cible : "card.type == TypeCard.CREATURE",
            trigger : 15
        }]
    }
];