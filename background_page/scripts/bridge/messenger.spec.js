'use strict';

define([
  'bridge/messenger-impl',
  'window',
  'sinon'
  ],
  function (messenger, window, sinon) {

    describe('messenger module', function () {
      it('should export a defined value', function () {
        expect(messenger).toBeDefined();
      });
    });

    describe('.send', function () {
      it('should call window.postMessage with the correct arguments', function () {
        var message;

        message = 'some-message';

        messenger.send(message);

        expect(window.postMessage.withArgs(message, '*').callCount).toBe(1);
      });
    });

    describe('.onRecieve', function () {
      it('should call window.addEventListener with the correct arguments', function () {
        messenger.onRecieve(new Function());

        expect(window.addEventListener.withArgs('message', sinon.match.func).callCount).toBe(1);
      });

      it('should call the handler with event.data when the listener is fired', function () {
        var event,
            handler;

        event = {
          data: 'some-event-data'
        };

        handler = sinon.stub();
        messenger.onRecieve(handler);

        window.addEventListener.callArgWith(1, event);

        expect(handler.withArgs(event.data).callCount).toBe(1);
      });
    });
});
