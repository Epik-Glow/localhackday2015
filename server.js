var express = require('express');
var app = express();
var compression = require('compression');

var room = {}; // Contains rooms by code

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

                // TODO send code to show on page
                res.send(JSON.stringify(code));
                break;
            }
        }
    });

var server = app.listen(8080, function() {
    var host = server.address()
        .address;
    var port = server.address()
        .port;

    console.log('Listening on port at http://%s:%s', host, port);
});

