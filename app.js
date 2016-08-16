var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 1337;

// Map statis request to the /public folder.
app.use(express.static(__dirname + '/public'));

// Request for the root to the index.html.
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

// Redirect the user to default.html if URL doesnt include filename.
app.get('/', function(request, response) {
    response.redirect('default.html');
});

// List of usernames.
var usernames = {};

// Subscribe to the socket.io events and accept socket as param which represents an object.
io.sockets.on('connection', function(socket) {

    // Sendchat event. It's triggered when a message is received from a chat client.
    // Code uses the socket.io object to broadcast the mssage to all chat clients.
    socket.on('sendchat', function(data) {
        io.sockets.emit('updatechat', socket.username, data);
    });

    // Adduser event. It's triggered after the client makes a connection. Adds username to usernames collection.
    // After that uses socket object to call updatechate event on the current client to indicate to
    // the user that connection is successful. This message is broadcast an updated user list to all clients.
    socket.on('adduser', function(username) {
        socket.username = username;
        usernames[username] = username;
        socket.emit('updatechat', 'Server', 'you have connected');
        socket.broadcast.emit('updatechat', 'Server', username + ' has connected');
        io.sockets.emit('updateusers', usernames);
    });

    // Disconnect event. Deletes the user from the username list and broadcasts the username to all clients.
    // The socket.broadcasts a disconnect message to all clients except the current client.
    socket.on('disconnect', function() {
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat', 'Server', socket.username + ' has disconnected');
    });

});

// Listen on port 1337 and logout console message.
server.listen(port);
console.log('Server started: http://localhost:' + port + '/');
