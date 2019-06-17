var socket = io();
var socketApi = {};

socket.on('event', function(event){
    socketApi.gameState.view.onReceive(event);
});

socket.on('lets_go', function(){
    console.log('ca commence');
    $("#jouer").hide();
    socketApi.game.state.start("Game");
    socketApi.gameState.onCreateCallback = function() {
        socketApi.gameState.view.myName = pseudo;
        socketApi.viewCreated();
    }
});

socketApi.viewCreated = function() {
    socket.emit('viewCreated');
}

socketApi.play = function(pseudo) {
    socket.emit('play', {name : pseudo, deck : [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]});
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