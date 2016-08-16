var socket;

// Subscribe to the connect, updatechat, and updateusers events of the socket.
$(document).ready(function() {
    socket = io.connect('http://localhost:8080');
    socket.on('connect', addUser);
    socket.on('updatechat', processMessage);
    socket.on('updateusers', updateUserList);
    $('#datasend').click(sendMessage);
    $('#data').keypress(processEnterPress);
})

// Add the addUser function, which clals the emit method on the socket to call
// the adduser method on the chat server.
function addUser() {
    socket.emit('adduser', prompt("What's your name?"));
}

// processMessage function is called when the chat service sends a message.
// jQuery object with the response and insert message after converstaion.
function processMessage(username, data) {
    $('<b>' + username + ':</b> ' + data + '<br/>').insertAfter($('#conversation'));
}

// updateUserList function is called when server sends an updated user list.
function updateUserList(data) {
    $('#users').empty();
    $.each(data, function(key, value) {
        $('#users').append('div>' + key + '</div>');
    });
}

// sendMessage function is called to send a message to the server.
function sendMessage() {
    var message = $('#data').val();
    $('#data').val('');
    socket.emit('sendchat', message);
    $('#data').focus();
}

// Function is called when the user presses the Enter key.
function processEnterPress(e) {
    if(e.which == 13) {
        e.preventDefault();
        $(this).blur();
        $('#datasend').focus().click();
    }
}
