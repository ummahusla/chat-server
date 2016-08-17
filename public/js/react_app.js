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

ReactDOM.render(
  <TopBarBox />,
  document.getElementById('nav-wrap')
);
