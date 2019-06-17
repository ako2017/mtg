var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};
const Game = require('./model/Game');
const CardFactory = require('./model/card/CardFactory');
const Player = require('./model/Player');
const GameEventHandler = require('./GameEventHandler');

var games = [];

socketApi.io = io;

function findFreeGame() {
    for(let i=0;i<games.length;i++) {
        if(!games[i].isFull()) {
            console.log("partie libre trouvee");
            return i;
        }
    }
    console.log("aucune partie libre trouvee");
    return -1;
}

function createGame() {
    console.log("partie cree");
    var game = new Game();
    game.addObserver(new GameEventHandler(socketApi));
    games.push(game);
    return games.length - 1;
}

io.on('connection', function(socket){
    console.log('A user connected');

    socket.on('play', function(playerInfo){
        var idGame = findFreeGame();
        if(idGame == -1) {
            idGame = createGame(); 
        }
        
        console.log('tu es bien connecte ' + playerInfo.name);
        var cardFactory = new CardFactory();
        var player = new Player();
        player.name = playerInfo.name;
        for(var i=0;i<playerInfo.deck.length;i++) {
            player.deck.push(cardFactory.create(playerInfo.deck[i]));
        }
        games[idGame].addPlayer(player);
        socket.player = player;
        socket.idGame = idGame;
 
        if(games[idGame].isFull()) {
            console.log('la partie va commencer');
            io.emit('lets_go');
        }
    });

    socket.on('viewCreated', function(){
        var idGame = socket.idGame;
        console.log('idgame:'+idGame + 'player:'+socket.player );
        socket.player.createdView = true;
        for(var i =0;i<games[idGame].getPlayers().length;i++) {
            if(!games[idGame].getPlayers()[i].createdView) {
                return ;
            }
        }
        games[idGame].start();
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