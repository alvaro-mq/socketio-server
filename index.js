'use strict';
const path = require('path');
const express = require('express');
const app = express();

const SocketIo = require('socket.io');


// settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
  console.log(`Server listening on ${app.get('port')}`);
});

const io = SocketIo.listen(server);

// websockets
io.on('connection', (socket) => {
  console.log('new connection', socket.id);
  socket.on('chat:message', (data) => {
    io.sockets.emit('chat:message', data);
  });

  socket.on('chat:typing', (data) => {
    socket.broadcast.emit('chat:typing', data);
  });
});