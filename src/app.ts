const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const socket = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
});

app.get('/', (req, res) => {
  res.send('Hello, its WS lite server');
});


socket.on('connection', (socketChannel) => { // if client connect =>
  socketChannel.on('client-message-sent', (message: string) => {
    console.log(message)
  })

});

const PORT = process.env.PORT || 3009

server.listen(PORT, () => {
  console.log('listening on *:3009');
});