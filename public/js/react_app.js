console.log(React);
console.log(ReactDOM);

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
            <p><span id="#greeting">Bonsua!</span> <a href="https://github.com/ummahusla/Chat-Server/">Chat Server</a> is built with <a href="https://nodejs.org">Node.js</a>, <a href="http://expressjs.com/">Express.js</a> and <a href="http://socket.io/">Socket.io</a></p>
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


ReactDOM.render(<TopBarBox />, document.getElementById('nav-wrap'));
ReactDOM.render(<ChatNoticeBox />, document.getElementById('chat-notice'));
ReactDOM.render(<MessageBox />, document.getElementById('message-wrap'));
