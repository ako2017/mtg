var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};
const Game = require('./model/Game');
const Player = require('./model/Player');
const Capacity = require('./model/card/capacity/Capacity');
const AddLifeEffect = require('./model/card/capacity/effect/AddLifeEffect');
var games = [];

socketApi.io = io;

function findFreeGame() {
    for(let i=0;i<games.length;i++) {
        if(games[i].players.length != 2) {
            console.log("partie libre trouvee");
            return i;
        }
    }
    console.log("aucune partie libre trouvee");
    return -1;
}

function createGame() {
    console.log("partie cree");
    var game = {players:[]};
    games.push(game);
    return games.length - 1;
}

function createCreatureTriggerOnEnterBattlefieldAddOneLife(player) {
	var card = new Card(player);
	card.force = 0;
	card.endurance = 0;
	card.mana = [1,0,0,0,0,0];
	card.type = TypeCard.CREATURE;
	var capacity = new Capacity([0,0,0,0,0,0], function(trigger,source) {return trigger == GameEvent.ON_ENTER_BATTLEFIELD});
	capacity.addEffect(new AddLifeEffect(10));
	card.addCapacity(capacity);
	return card;
};

io.on('connection', function(socket){
    console.log('A user connected');
    var g = [];
    g.removeByValue('gh');
    // receive from client (index.ejs) with socket.on
    socket.on('play', function(playerInfo){
        var idGame = findFreeGame();
        if(idGame == -1) {
            idGame = createGame();    
        }
        
        games[idGame].players.push(playerInfo);
        console.log('tu es bien connecte ' + playerInfo.name);
        if(games[idGame].players.length == 2) {
            console.log('la partie va commencer');
            io.emit('lets_go' , games[idGame].players);
            games[idGame].game = new Game();
            for(var i = 0;i<games[idGame].players.length;i++) {
                var player = new Player();
                player.name = games[idGame].players[0].name;
                for(var j=0;j<60;j++) {
                    player.deck.push(createCreatureTriggerOnEnterBattlefieldAddOneLife(player));
                }
                games[idGame].game.addPlayer(player);
            }
        }
    });



    socket.on('pass', function(msg){
        
    });

    socket.on('valid', function(msg){
    });

    socket.on('poseCard', function(msg){
    });

    socket.on('declareAttaquant', function(msg){
    });

    socket.on('muligane', function(msg){
    });
});

socketApi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socketApi;