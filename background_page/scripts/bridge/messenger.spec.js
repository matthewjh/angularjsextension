'use strict';

define([
  'bridge/messenger-impl',
  'window'
  ],
  function (messenger, window) {

    describe('messenger module', function () {
      it('should export a defined value', function () {
        expect(messenger).toBeDefined();
      });
    });

    describe('.sendMessage', function () {
      it('should call window.postMessage with the correct arguments', function () {
        var message;

        message = 'some-message';

        messenger.sendMessage(message);

        expect(window.postMessage.withArgs(message, '*').callCount).toBe(1);
      });
    });

    describe('.onRecieve', function () {
      it('should call window.addEventListener with the correct arguments', function () {
        var handler;

        handler = new Function();

        messenger.onRecieve(handler);

        expect(window.addEventListener.withArgs('message', handler).callCount).toBe(1);
      });
    });
});
