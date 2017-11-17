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

  socket.on('newLocationMessage', function(locationMessage) {
      var li = $('<li/>');
      var a = $('<a target="_blank">My current location</a>');
      li.text(`${locationMessage.from}: `);
      a.attr('href', locationMessage.url);
      li.append(a);
      $('#messages').append(li);
  });



  $('#message-form').on('submit', function(event) {
    event.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: $('[name=message]').val()
    }, function() {
    });
  });

  var locationButton = $('#send-location');
  locationButton.on('click', function() {
    if(!navigator.geolocation) {
      return alert('geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      socket.emit('createLocationMessage', {
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
      });
    }, function() {
      alert('Unable to fetch the location');
    });
  });
