  var socket = io(); //initiating a request

  socket.on('connect', function() {
    console.log('Connected to the server');
  });

  socket.on('disconnect', function(){
    console.log('Disconnected from the server');
  });

  socket.on('newMessage', function(message) {
    var formatedTime = moment(message.createAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      from: message.from,
      createAt: formatedTime,
      text : message.text
    });
    $('#messages').append(html);
  });

  socket.on('newLocationMessage', function(locationMessage) {
      var formatedTime = moment(locationMessage.createAt).format('h:mm a')
      var locationTemplate = $('#location-message-template').html();
      var html= Mustache.render(locationTemplate, {
        from: locationMessage.from,
        createAt: formatedTime,
        url: locationMessage.url
      });
      $('#messages').append(html);

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
