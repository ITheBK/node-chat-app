  const path = require('path');
  const http = require('http');
  const express = require('express');
  const socketIO = require('socket.io');

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

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    })
  });



  server.listen(port, () => {

    console.log(`Server is up on ${port}`);

  });
