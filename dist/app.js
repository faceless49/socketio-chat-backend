const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.get('/', (req, res) => {
    res.send('Hello, its WS lite server');
});
io.on('connection', (socket) => {
    console.log('a user connected');
});
server.listen(3009, () => {
    console.log('listening on *:3009');
});
//# sourceMappingURL=app.js.map