  const path = require('path');
  const http = require('http');
  const express = require('express');
  const socketIO = require('socket.io');

  const {generateMessage, generateLocationMessage} = require('./utils/message');
  //To not use ../ to go to public/index.html
  const publicPath = path.join(__dirname, '../public');
  const port = process.env.PORT || 3000;
  var app = express();
  var server = http.createServer(app);
  var io = socketIO(server);

  app.use(express.static(publicPath));

  //listen to event
  io.on('connection', (socket) => {
    console.log('New user connected');

    //Send greeting message to joined user
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    //Send user joined event to all other user
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage', (message, callback) => {
      console.log('createMessage',message);
      //Broadcast to all use io including sender also
      io.emit('newMessage',generateMessage(message.from, message.text));

      callback({message:'This is from the server'});
    });

    socket.on('createLocationMessage', (coords) => {
      io.emit('newLocationMessage',generateLocationMessage('User', coords.latitude, coords.longitude));
    })


    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

  });


  server.listen(port, () => {
    console.log(`Server is up on ${port}`);

  });
