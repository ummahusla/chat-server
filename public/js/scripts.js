var socket;

// Subscribe to the connect, updatechat, and updateusers events of the socket.
$(document).ready(function() {
    socket = io.connect('http://localhost:1337');
    socket.on('connect', addUser);
    socket.on('updatechat', processMessage);
    socket.on('updateusers', updateUserList);
    $('#datasend').click(sendMessage);
    $('#data').keypress(processEnterPress);
})

// Add the addUser function, which clals the emit method on the socket to call
// the adduser method on the chat server.
function addUser() {
    var userNamePromt = prompt("What's your name?")
    var randomUserName = Math.random().toString(36).substr(2, 5);

    // Checks if the prompt value is not empty
    if(!userNamePromt) {
        // username randomly generated
        socket.emit('adduser', randomUserName);
    } else {
        // username provided by user
        socket.emit('adduser', userNamePromt);
    }

    // Checks if the user is connected
    if(socket.socket.connected) {
        userConnected = true;
    } else {
        userConnected = false;
    }

}

// processMessage function is called when the chat service sends a message.
// jQuery object with the response and insert message after converstaion.
function processMessage(username, data) {
    $('<strong>' + username + ':</strong> ' + data + '<br/>').insertAfter($('#conversation'));
}

// updateUserList function is called when server sends an updated user list.
function updateUserList(data) {
    $('#users').empty();
    $.each(data, function(key, value) {
        $('#users').append('<div class="userClass">' + key + '</div>');
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
