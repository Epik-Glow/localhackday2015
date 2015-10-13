var express = require('express');
var http = require('http').Server(app);
var app = express();
var io = require('socket.io')(http);
var compression = require('compression');

var rooms = {}; // Store rooms using randomly generated 6 dig codes as keys

app.use(compression());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.route('/room')
    .post(function(req, res) {
        while (true) {
            var code = Math.floor(Math.random() * 1000000);

            // Check to see if the room already exists
            if (!(code.toString() in room)) {
                room[code] = {};

                res.status(201).send(JSON.stringify(code));
                break;
            }
        }
    });

io.on('connection', function(socket) {
    socket.on('roomCode', function (code) {
        if (code.toString() in rooms) {
            socket.join(code);  // Joins socket with the unique room
            socket.emit('room', { exists: true });
        } else {
            socket.emit('room', { exists: false });
        }
    });

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
});

var server = http.listen(8080, function() {
    var host = server.address()
        .address;
    var port = server.address()
        .port;

    console.log('Listening on port at http://%s:%s', host, port);
});
