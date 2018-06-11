# Chat Server

> **Note**: Front-end is built with React, but is in a very bad state, and should be not used in production for many reasons. PRs are welcome.

[**Chat Server**](https://github.com/ummahusla/Chat-Server/) is built with [**React**](https://facebook.github.io/react/), [**Node**](https://nodejs.org), [**Express**](http://expressjs.com/) and [**Socket.io**](http://socket.io/). Demo is available [**here**](https://chat-server-heroku.herokuapp.com/).

![](screenshot.jpg)

## Installation and Usage

1. `git clone https://github.com/ummahusla/Chat-Server.git your-folder`
2. `cd your-folder`
3. `npm install`
4. `cd public/js/`
5. `vi script.js`
6. Replace `var socket = io.connect('https://chat-server-heroku.herokuapp.com/');` with `var socket = io.connect('http://localhost:1337/');`
7. `npm start` or `node app.js` or `nodemon`

P.S. In order to run a node on a different port, use `PORT=8080 node app.js`.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits

* [**Edvins Antonovs**](https://github.com/ummahusla)

## License

MIT license
