  const path = require('path');
  const http = require('http');
  const express = require('express');
  const socketIO = require('socket.io');

  const {generateMessage, generateLocationMessage} = require('./utils/message');
  const {isRealString} = require('./utils/validation');
  const {Users} =require('./utils/users');
  //To not use ../ to go to public/index.html
  const publicPath = path.join(__dirname, '../public');
  const port = process.env.PORT || 3000;
  var app = express();
  var server = http.createServer(app);
  var io = socketIO(server);
  var users = new Users();

  app.use(express.static(publicPath));

  //listen to event
  io.on('connection', (socket) => {
    console.log('New user connected');

    //Send greeting message to joined user
    //socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    //Send user joined event to all other user
    //socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('join', (params, callback) => {
      if(!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and room are required');
      }
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      //socket.leave(name);

      //io.emit -> io.to('Room name').emit()
      //socket.broadcast.emit -> scoket.broadcast.to('Roomname').emit


      io.to(params.room).emit('updateUserList',users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} joined`));

      callback();
    });

    socket.on('createMessage', (message, callback) => {
      console.log('createMessage',message);
      //Broadcast to all use io including sender also
      io.emit('newMessage',generateMessage(message.from, message.text));
      callback();
    });

    socket.on('createLocationMessage', (coords) => {
      io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })


    socket.on('disconnect', () => {
      console.log('Client disconnected');
      var user = users.removeUser(socket.id);

      if(user) {
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
      };
    });

  });


  server.listen(port, () => {
    console.log(`Server is up on ${port}`);

  });
