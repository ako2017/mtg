var socket = io();
var socketApi = {};

socket.on('event', function(event){
    socketApi.gameState.view.onReceive(event);
});

socket.on('lets_go', function(playersData){
    console.log('ca commence');
    $("#jouer").hide();
    socketApi.game.state.start("Game", playersData);
    socketApi.gameState.onCreateCallback = function() {
        socketApi.viewCreated();
    }
});

socketApi.viewCreated = function() {
}

socketApi.play = function(pseudo) {
    socket.emit('play', {name : pseudo,
    life : 21,
    deck : [{uid:1,id:1},{uid:2,id:1},{uid:3,id:1},{uid:4,id:1},{uid:5,id:1}]});
}

socketApi.pass = function() {
    socket.emit('pass');
}


socketApi.valid = function() {
    socket.emit('hello', {msg: 'Hello World!'});
}

socketApi.poseCard = function() {
    socket.emit('hello', {msg: 'Hello World!'});
}

socketApi.declareAttaquant = function() {
    socket.emit('hello', {msg: 'Hello World!'});
}

socketApi.muligane = function() {
    socket.emit('hello', {msg: 'Hello World!'});
}