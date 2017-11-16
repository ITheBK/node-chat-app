  var socket = io(); //initiating a request

  socket.on('connect', function() {
    console.log('Connected to the server');

    // socket.emit('createMessage', {
    //   from:'ithebk',
    //   text:'Hey how are you'
    // });
  });

  socket.on('disconnect', function(){
    console.log('Disconnected from the server');
  });

  socket.on('newMessage', function(message) {
    console.log('new Message Recieved',message);
  });
