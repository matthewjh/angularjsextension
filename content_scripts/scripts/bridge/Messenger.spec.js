'use strict';

define([
  'bridge/Messenger-impl',
  'window',
  'sinon'
  ],
  function (Messenger, window, sinon) {
    var MessengerImpl,
        windowMock;

    beforeEach(function () {
      MessengerImpl = Messenger.get();
      windowMock = window.get();
    });

    describe('messenger object created with a valid context', function () {
      var messenger;

      beforeEach(function () {
        messenger = new MessengerImpl(MessengerImpl.contexts.CONTENT_SCRIPT);
      });

      describe('.send', function () {
        it('should call window.postMessage with the correct payload', function () {
          var payload = 'some-message';

          messenger.send(payload);

          expect(
            windowMock.postMessage
            .withArgs(sinon.match.has('payload', payload), '*')
            .callCount).toBe(1);
        });
      });

      describe('.onReceive', function () {
        it('should call window.addEventListener with the correct arguments', function () {
          messenger.onReceive(sinon.stub());

          expect(windowMock.addEventListener.withArgs('message', sinon.match.func).callCount).toBe(1);
        });
      });
    });

    describe('messenger object created with CONTENT_SCRIPT context', function () {
      var messenger;

      beforeEach(function () {
        messenger = new MessengerImpl(MessengerImpl.contexts.CONTENT_SCRIPT);
      });

      describe('.send', function () {
        it('should call window.postMessage with the targetContext set to INSPECTED_PAGE', function () {
          messenger.send('some-message');

          expect(
            windowMock.postMessage
            .withArgs(sinon.match.has('targetContext', MessengerImpl.contexts.INSPECTED_PAGE), '*')
            .callCount).toBe(1);
        });
      });

      describe('.onReceive', function () {
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

          event.data.targetContext = MessengerImpl.contexts.CONTENT_SCRIPT;
          handler = sinon.stub();
          messenger.onReceive(handler);

          windowMock.addEventListener.callArgWith(1, event);

          expect(handler.withArgs(event.data.payload).callCount).toBe(1);
        });

        it('should not call the handler with event.data.payload when the listener is fired' +
           'and the targetContext is not CONTENT_SCRIPT', function () {
          var handler;

          event.data.targetContext = MessengerImpl.contexts.INSPECTED_PAGE;
          handler = sinon.stub();
          messenger.onReceive(handler);

          windowMock.addEventListener.callArgWith(1, event);

          expect(handler.withArgs(event.data.payload).callCount).toBe(0);
        });
      });
    });

    describe('messenger object created with INSPECTED_PAGE context', function () {
      var messenger;

      beforeEach(function () {
        messenger = new MessengerImpl(MessengerImpl.contexts.INSPECTED_PAGE);
      });

      describe('.send', function () {
        it('should call window.postMessage with the targetContext set to CONTENT_SCRIPT', function () {
          messenger.send('some-message');

          expect(
            windowMock.postMessage
            .withArgs(sinon.match.has('targetContext', MessengerImpl.contexts.CONTENT_SCRIPT), '*')
            .callCount).toBe(1);
        });
      });

      describe('.onReceive', function () {
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

          event.data.targetContext = MessengerImpl.contexts.INSPECTED_PAGE;
          handler = sinon.stub();
          messenger.onReceive(handler);

          windowMock.addEventListener.callArgWith(1, event);

          expect(handler.withArgs(event.data.payload).callCount).toBe(1);
        });

        it('should not call the handler with event.data.payload when the listener is fired' +
           'and the targetContext is not INSPECTED_PAGE', function () {
          var handler;

          event.data.targetContext = MessengerImpl.contexts.CONTENT_SCRIPT;
          handler = sinon.stub();
          messenger.onReceive(handler);

          windowMock.addEventListener.callArgWith(1, event);

          expect(handler.withArgs(event.data.payload).callCount).toBe(0);
        });
      });
    });

    describe('messenger object created with an invalid context', function () {
      var messenger;

      beforeEach(function () {
        messenger = new MessengerImpl('some-invalid-context');
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
