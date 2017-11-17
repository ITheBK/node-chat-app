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

    var messageTextbox=  $('[name=message]');
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
  });

  var locationButton = $('#send-location');
  locationButton.on('click', function() {
    if(!navigator.geolocation) {
      return alert('geolocation not supported by your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled').text('Send Location');
      console.log(position);
      socket.emit('createLocationMessage', {
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
      });
    }, function() {
      locationButton.removeAttr('disabled');
      alert('Unable to fetch the location').text('Send Location');
    });
  });
