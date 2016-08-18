var socket = io.connect('http://localhost:1337');
socket.on('connect', addUser);
socket.on('updatechat', processMessage);
socket.on('updateusers', updateUserList);

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
    var userConnected;
    
    if(socket.socket.connected) {
        userConnected = true;
    } else {
        userConnected = false;
    }

}

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


var TopBarBox = React.createClass({
  render: function() {
    return (
        <nav className="top-bar" data-topbar role="navigation">
            <ul className="title-area">
                <li className="name">
                    <h1><a href="#">Chat Server</a></h1>
                </li>
                <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
            </ul>

            <section className="top-bar-section">
                <ul className="right">
                    <li><a href="https://github.com/ummahusla/Chat-Server/"><i className="fa fa-github" aria-hidden="true"></i> GitHub</a></li>
                    <li><a href="https://github.com/ummahusla/Chat-Server/archive/master.zip"><i className="fa fa-download" aria-hidden="true"></i> Download</a></li>
                    <li><a href="https://twitter.com/edvinsantonovs"><i className="fa fa-twitter" aria-hidden="true"></i> Twitter</a></li>
                </ul>
            </section>
        </nav>
    );
  }
});

var ChatNoticeBox = React.createClass({
    render: function() {
        return (
            <p><span id="#greeting">Bonsua!</span> <a href="https://github.com/ummahusla/Chat-Server/">Chat Server</a> is built with <a href="https://facebook.github.io/react/">React</a>, <a href="https://nodejs.org">Node.js</a>, <a href="http://expressjs.com/">Express.js</a> and <a href="http://socket.io/">Socket.io</a></p>
        )
    }
});

var MessageBox = React.createClass({
    getInitialState: function() {
        return {
            message: ''
        };
    },
    handleMessageChange: function(e) {
        this.setState({message: e.target.value});
    },
    handleClick: function() {
        var message = this.state.message;
        var data = document.getElementById('data');
        message = message.replace(/<(?:.|\n)*?>/gm, '');
        if(!message) {
            sweetAlert("Oops...", "You've didn\'t entered a message!", "error");
        } else {
            socket.emit('sendchat', message);
        }
        this.state.message = this.setState({message: ''});
        data.value = '';
        data.focus();
    },
    handleKeyPress: function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            $(this).blur();
            $('#datasend').focus().click();
        }
    },
    render: function() {
        return (
            <div>
                <input id="data" placeholder="Message.." onChange={this.handleMessageChange} onKeyUp={this.handleKeyPress} />
                <input id="datasend" className="button send-msg" type="button" onClick={this.handleClick} value="Send message" />
            </div>
        )
    },
});

var UserListBox = React.createClass({
    render: function() {
        return (
            <div>
                <h3>Users</h3>
                <div id="users"></div>
            </div>
        )
    }
});


ReactDOM.render(<TopBarBox />, document.getElementById('nav-wrap'));
ReactDOM.render(<ChatNoticeBox />, document.getElementById('chat-notice'));
ReactDOM.render(<MessageBox />, document.getElementById('message-wrap'));
ReactDOM.render(<UserListBox />, document.getElementById('users-wrap'));
