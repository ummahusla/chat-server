# Chat Server

Bonsua! [**Chat Server**](https://github.com/ummahusla/Chat-Server/) is built with [**React**](https://facebook.github.io/react/), [**Node**](https://nodejs.org), [**Express**](http://expressjs.com/) and [**Socket.io**](http://socket.io/). Demo is available [**here**](https://chat-server-heroku.herokuapp.com/).

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

The MIT License (MIT)

Copyright (c) 2016 Edvins Antonovs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
