var socket;
var userConnected;

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
    var userNamePromt = swal({
        title: "Please enter your username",
        type: "input",
        showCancelButton: false,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "e.g Gavin Belson or Mr.Robot"
    }, function(inputValue){
        if (inputValue === false) return false;
        if (inputValue === "") {
             swal.showInputError("Hey, we need you to enter your username!");
             return false
         }
         inputValue = inputValue.replace(/<(?:.|\n)*?>/gm, '');
         swal("Nice!", "Your username is " + inputValue, "success");
         socket.emit('adduser', inputValue);
     });

    // Checks if the user is connected
    if(socket.socket.connected) {
        userConnected = true;
    } else {
        userConnected = false;
    }

}

// Get the current timestamp to display in the chat.
function getCurrentTime() {
    var datetime = new Date();
    var hours = datetime.getHours();
    var minutes = datetime.getMinutes();
    var seconds = datetime.getSeconds();

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return hours + ':' + minutes + ':' + seconds;
}

// processMessage function is called when the chat service sends a message.
// jQuery object with the response and insert message after converstaion.
function processMessage(username, data) {

    $('<span class="message">' + '[' + getCurrentTime() + '] ' + '<strong>' + username + ':</strong> ' + data + '</span><br/>').insertAfter($('#conversation'));
}

// updateUserList function is called when server sends an updated user list.
function updateUserList(data) {
    $('#users').empty();
    $.each(data, function(key, value) {
        $('#users').append('<div class="username"><i class="fa fa-user" aria-hidden="true"></i> ' + key + '</div>');
    });
}

// sendMessage function is called to send a message to the server.
function sendMessage() {
    var message = $('#data').val();
    message = message.replace(/<(?:.|\n)*?>/gm, '');
    $('#data').val('');
    if(!message) {
        sweetAlert("Oops...", "You've didn\'t entered a message!", "error");
    } else {
        socket.emit('sendchat', message);
    }
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
