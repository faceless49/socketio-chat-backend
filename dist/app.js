const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const socket = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});
const messages = [];
const usersState = new Map(); // We save all usersState in this collection
app.get('/', (req, res) => {
    res.send('Hello, its WS lite server');
});
socket.on('connection', (socketChannel) => {
    usersState.set(socketChannel, { id: new Date().getDate().toString(), name: 'anonym' });
    socket.on('disconnect', () => {
        usersState.delete(socketChannel); // when user disconnect we delete our channel with him
    });
    socketChannel.on('client-name-sent', (name) => {
        const user = usersState.get(socketChannel); // We needed to save users for socketChannel
        user.name = name; // When socketChannel create(user coming) we get user and change name from closure
    });
    socketChannel.on('client-message-sent', (message, successFn) => {
        if (typeof message !== 'string' || message.length > 20) {
            successFn('Message length should be less than 20 chars');
            return;
        }
        const user = usersState.get(socketChannel);
        let messageItem = {
            message: message, id: new Date().getDate().toString(),
            user: { id: user.id, name: user.name }
        };
        messages.push(messageItem);
        socket.emit('new-message-sent', messageItem);
        successFn(null);
    });
    socketChannel.emit('init-messages-published', messages, () => {
        console.log('INIT MESSAGE RECEIVED');
    });
    socketChannel.on('client-typed', () => {
        socketChannel.broadcast.emit('user-typed-message', usersState.get(socketChannel));
    });
});
const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log('listening on *:3009');
});
//# sourceMappingURL=app.js.map