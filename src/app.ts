const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const socket = new Server(server, {
  cors: {
    origin: 'https://localhost:3000'
  }
});

app.get('/', (req, res) => {
  res.send('Hello, its WS lite server');
});


socket.on('connection', (connection) => { // if client connect =>
  console.log('a user connected');
});

const PORT = process.env.PORT || 3009

server.listen(PORT, () => {
  console.log('listening on *:3009');
});