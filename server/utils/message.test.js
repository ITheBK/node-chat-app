  var expect = require('expect');
  var {generateMessage, generateLocationMessage} = require('./message');

  describe('generateMessage', () => {
    it('should generate correct message object',() => {
      var from = 'test';
      var text = 'Test message';
      var message = generateMessage(from, text);

      expect(message).toInclude({from, text});
      expect(message.createAt).toBeA('number');
    });
  });

  describe('generateLocationMessage', () => {
    it('should generate correct location message', () => {
      var latitude = 1;
      var longitude = 1;
      var from = "Admin";
      var urlExpected = `https://www.google.co.in/maps?q=${latitude},${longitude}`;

      var locationMessage = generateLocationMessage(from, latitude, longitude);

      expect(locationMessage.createAt).toBeA('number');
      expect(locationMessage.url).toBe(urlExpected);
    });
  });
