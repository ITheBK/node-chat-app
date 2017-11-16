  var socket = io(); //initiating a request

  socket.on('connect', function() {
    console.log('Connected to the server');
  });

  socket.on('disconnect', function(){
    console.log('Disconnected from the server');
  });

  socket.on('newMessage', function(message) {
    var li = $('<li/>');
    li.text(`${message.from}:${message.text}`)
    $('#messages').append(li);
  });



  $('#message-form').on('submit', function (event) {
    event.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: $('[name=message]').val()
    }, function() {
    });
  });
