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

    });

    // describe('.registerContextAsContentScript', function () {
    //   it('should cause messages sent to have the targetContext property set to \'inspected-page\'', function () {
    //     var messagePayload;

    //     messagePayload = 'some-payload';
    //     messenger.registerContextAsContentScript();

    //     messenger.send(messagePayload);

    //     expect(
    //       window.postMessage
    //       .withArgs(sinon.match.has('targetContext', 'inspected-page'), '*')
    //       .callCount
    //       ).toBe(1);
    //   });
    // });

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

      // it('should throw an exception if called before a context has been set', function () {
      //   var thrownException;

      //   try {
      //     messenger.send('');
      //   } catch (exception) {
      //     thrownException = exception;
      //   }

      //   expect(thrownException).toBeTruthy();
      // });
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
