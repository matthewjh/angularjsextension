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

    describe('.registerContextAsInspectedPage', function () {
      it('should cause messages sent to have the targetContext property set to \'content-script\'', function () {
        var messagePayload;

        messagePayload = 'some-payload';
        messenger.registerContextAsInspectedPage();

        messenger.send(messagePayload);

        expect(
          window.postMessage
          .withArgs(sinon.match.has('targetContext', 'content-script'), '*')
          .callCount
          ).toBe(1);
      });
    });

    describe('.registerContextAsContentScript', function () {
      it('should cause messages sent to have the targetContext property set to \'inspected-page\'', function () {
        var messagePayload;

        messagePayload = 'some-payload';
        messenger.registerContextAsContentScript();

        messenger.send(messagePayload);

        expect(
          window.postMessage
          .withArgs(sinon.match.has('targetContext', 'inspected-page'), '*')
          .callCount
          ).toBe(1);
      });
    });

    describe('.send', function () {
      it('should call window.postMessage with the correct payload', function () {
        var message;

        message = 'some-message';
        messenger.registerContextAsContentScript();

        messenger.send(message);

        expect(
          window.postMessage
          .withArgs({
            payload: message,
            targetContext: 'inspected-page'
          }, '*')
          .callCount).toBe(1);
      });

      it('should throw an exception if called before a context has been set', function () {
        messenger.send = sinon.spy(messenger.send)

        messenger.send('');

        expect(messenger.send.threw()).toBe(true);
      });
    });

    describe('.onRecieve', function () {
      it('should call window.addEventListener with the correct arguments', function () {
        messenger.onRecieve(sinon.stub());

        expect(window.addEventListener.withArgs('message', sinon.match.func).callCount).toBe(1);
      });

      it('should call the handler with event.data.payload when the listener is fired', function () {
        var event,
            handler;

        event = {
          data: {
            payload: 'some-payload'
          }
        };

        handler = sinon.stub();
        messenger.onRecieve(handler);

        window.addEventListener.callArgWith(1, event);

        expect(handler.withArgs(event.data.payload).callCount).toBe(1);
      });
    });
});
