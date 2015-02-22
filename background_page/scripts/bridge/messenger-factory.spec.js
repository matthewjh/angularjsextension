'use strict';

define([
  'bridge/messenger-factory-impl',
  'window',
  'sinon'
  ],
  function (messengerFactory, window, sinon) {

    describe('messenger object created with a valid context', function () {
      var messenger;

      beforeEach(function () {
        messenger = messengerFactory(messengerFactory.contexts.CONTENT_SCRIPT);
      });

      describe('.send', function () {
        it('should call window.postMessage with the correct payload', function () {
          var payload = 'some-message';

          messenger.send(payload);

          expect(
            window.postMessage
            .withArgs(sinon.match.has('payload', payload), '*')
            .callCount).toBe(1);
        });
      });

      describe('.onRecieve', function () {
        it('should call window.addEventListener with the correct arguments', function () {
          messenger.onRecieve(sinon.stub());

          expect(window.addEventListener.withArgs('message', sinon.match.func).callCount).toBe(1);
        });
      });
    });

    describe('messenger object created with CONTENT_SCRIPT context', function () {
      var messenger;

      beforeEach(function () {
        messenger = messengerFactory(messengerFactory.contexts.CONTENT_SCRIPT);
      });

      describe('.send', function () {
        it('should call window.postMessage with the targetContext set to INSPECTED_PAGE', function () {
          messenger.send('some-message');

          expect(
            window.postMessage
            .withArgs(sinon.match.has('targetContext', messengerFactory.contexts.INSPECTED_PAGE), '*')
            .callCount).toBe(1);
        });
      });

      describe('.onRecieve', function () {
        var event;

        beforeEach(function () {
          event = {
            data: {
              payload: 'some-payload',
              targetContext: null
            }
          };
        });

        it('should call the handler with event.data.payload when the listener is fired' +
           'and the targetContext is CONTENT_SCRIPT', function () {
          var handler;

          event.data.targetContext = messengerFactory.contexts.CONTENT_SCRIPT;
          handler = sinon.stub();
          messenger.onRecieve(handler);

          window.addEventListener.callArgWith(1, event);

          expect(handler.withArgs(event.data.payload).callCount).toBe(1);
        });

        it('should not call the handler with event.data.payload when the listener is fired' +
           'and the targetContext is not CONTENT_SCRIPT', function () {
          var handler;

          event.data.targetContext = messengerFactory.contexts.INSPECTED_PAGE;
          handler = sinon.stub();
          messenger.onRecieve(handler);

          window.addEventListener.callArgWith(1, event);

          expect(handler.withArgs(event.data.payload).callCount).toBe(0);
        });
      });
    });

    describe('messenger object created with INSPECTED_PAGE context', function () {
      var messenger;

      beforeEach(function () {
        messenger = messengerFactory(messengerFactory.contexts.INSPECTED_PAGE);
      });

      describe('.send', function () {
        it('should call window.postMessage with the targetContext set to CONTENT_SCRIPT', function () {
          messenger.send('some-message');

          expect(
            window.postMessage
            .withArgs(sinon.match.has('targetContext', messengerFactory.contexts.CONTENT_SCRIPT), '*')
            .callCount).toBe(1);
        });
      });

      describe('.onRecieve', function () {
        var event;

        beforeEach(function () {
          event = {
            data: {
              payload: 'some-payload',
              targetContext: null
            }
          };
        });

        it('should call the handler with event.data.payload when the listener is fired' +
           'and the targetContext is INSPECTED_PAGE', function () {
          var handler;

          event.data.targetContext = messengerFactory.contexts.INSPECTED_PAGE;
          handler = sinon.stub();
          messenger.onRecieve(handler);

          window.addEventListener.callArgWith(1, event);

          expect(handler.withArgs(event.data.payload).callCount).toBe(1);
        });

        it('should not call the handler with event.data.payload when the listener is fired' +
           'and the targetContext is not INSPECTED_PAGE', function () {
          var handler;

          event.data.targetContext = messengerFactory.contexts.CONTENT_SCRIPT;
          handler = sinon.stub();
          messenger.onRecieve(handler);

          window.addEventListener.callArgWith(1, event);

          expect(handler.withArgs(event.data.payload).callCount).toBe(0);
        });
      });
    });

    describe('messenger object created with an invalid context', function () {
      var messenger;

      beforeEach(function () {
        messenger = messengerFactory('some-invalid-context');
      });

      describe('.send', function () {
        it('should throw an exception', function () {
          var thrownException;

          try {
            messenger.send('some-message');
          } catch (exception) {
            thrownException = exception;
          }

          expect(thrownException).toBeDefined();
        });
      });
    });
});
