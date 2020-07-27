var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000 || process.env.PORT
app.use(express.static(__dirname + '/public'))
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
let connectedPeers = new Map()
//keping a reference of all the connections and there passstrings
var peers = io.of('/my-namespace');
peers.on('connection', socket => {
    connectedPeers.set(socket.id, socket)
    console.log("socket id " + socket.id)
    socket.emit('connection-success', {
        success: {
            socket_id: socket.id,
        }
    })
    socket.on('random', (e) => {
        for (const [socketID, socket] of connectedPeers.entries()) {
            // don't send to self
            if ((socketID !== e.socketID)) {
                socket.emit('coordinates', e)
            }
        };
    })
    socket.on('mouseup', (e) => {
        for (const [socketID, socket] of connectedPeers.entries()) {
            // don't send to self
            if ((socketID !== e.socketID)) {
                socket.emit('mouseup')
            }
        };
    })
})
http.listen(port, function () {
    console.log('listening on localhost:3000');
});