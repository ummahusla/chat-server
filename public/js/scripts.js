var socket;
var userConnected;

// Add the addUser function, which clals the emit method on the socket to call
// the adduser method on the chat server.
// function addUser() {
//     var userNamePromt = swal({
//         title: "Please enter your username",
//         type: "input",
//         showCancelButton: false,
//         closeOnConfirm: false,
//         animation: "slide-from-top",
//         inputPlaceholder: "e.g Gavin Belson or Mr.Robot"
//     }, function(inputValue){
//         if (inputValue === false) return false;
//         if (inputValue === "") {
//              swal.showInputError("Hey, we need you to enter your username!");
//              return false
//          }
//          inputValue = inputValue.replace(/<(?:.|\n)*?>/gm, '');
//          swal("Nice!", "Your username is " + inputValue, "success");
//          socket.emit('adduser', inputValue);
//      });
//
//     // Checks if the user is connected
//     if(socket.socket.connected) {
//         userConnected = true;
//     } else {
//         userConnected = false;
//     }
//
// }

// Get the current timestamp to display in the chat next to the message.
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
