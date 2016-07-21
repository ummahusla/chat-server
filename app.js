var express = require('express')
, app = express()
, http = require('http')
, server = http.createServer(app)
, io = require('socket.io').listen(server);

// Map statis request to the /public folder
app.use(express.static(__dirname + '/public'));

// Request for the root to the index.html
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

// Redirect the user to default.html if URL doesnt include filename
app.get('/', function(request, response) {
    response.redirect('default.html');
});
