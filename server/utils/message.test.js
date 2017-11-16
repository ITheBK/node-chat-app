  var expect = require('expect');
  var {generateMessage} = require('./message');

  describe('generateMessage', () => {
    it('should generate correct message object',() => {
      var from = 'test';
      var text = 'Test message';
      var message = generateMessage(from, text);

      expect(message).toInclude({from, text});
      expect(message.createAt).toBeA('number');
    });
  });
