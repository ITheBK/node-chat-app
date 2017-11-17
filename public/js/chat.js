  var socket = io(); //initiating a request

  function scrollToBottom() {
    //Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight+ scrollTop+ newMessageHeight+ lastMessageHeight>=scrollHeight) {
      messages.scrollTop(scrollHeight)
    }
  };

  socket.on('connect', function() {
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
      if (err) {
        alert(err);
        window.location.href = '/';
      } else {
        console.log('Joined');
      }
    });
    console.log('Connected to the server');
  });

  socket.on('disconnect', function(){
    console.log('Disconnected from the server');

  });

  socket.on('updateUserList', function (users) {

    console.log('Users list',users);
    var ol = $('<ol></ol>');

    users.forEach(function (user) {
      ol.append($('<li></li>').text(user));
    })
    $('#users').html(ol);
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
    scrollToBottom();
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
      scrollToBottom();
  });



  $('#message-form').on('submit', function(event) {
    event.preventDefault();
    var messageTextbox=  $('[name=message]');
    socket.emit('createMessage', {
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
