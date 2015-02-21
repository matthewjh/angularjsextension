'use strict';

define([
  'bridge/Messenger-impl',
  'window',
  'sinon'
  ],
  function (Messenger, window, sinon) {

    describe('Messenger module', function () {
      it('should export a constructor', function () {
        expect(Messenger.prototype).toBeDefined();
      });
    });

    describe('messenger object created with a valid context', function () {
      var messenger;

      beforeEach(function () {
        messenger = new Messenger(Messenger.contexts.CONTENT_SCRIPT);
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
        messenger = new Messenger(Messenger.contexts.CONTENT_SCRIPT);
      });

      it('should have the context property set to CONTENT_SCRIPT', function () {
        expect(messenger.context).toBe(Messenger.contexts.CONTENT_SCRIPT);
      });

      describe('.send', function () {
        it('should call window.postMessage with the targetContext set to INSPECTED_PAGE', function () {
          messenger.send('some-message');

          expect(
            window.postMessage
            .withArgs(sinon.match.has('targetContext', Messenger.contexts.INSPECTED_PAGE), '*')
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

          event.data.targetContext = Messenger.contexts.CONTENT_SCRIPT;
          handler = sinon.stub();
          messenger.onRecieve(handler);

          window.addEventListener.callArgWith(1, event);

          expect(handler.withArgs(event.data.payload).callCount).toBe(1);
        });

        it('should not call the handler with event.data.payload when the listener is fired' +
           'and the targetContext is not CONTENT_SCRIPT', function () {
          var handler;

          event.data.targetContext = Messenger.contexts.INSPECTED_PAGE;
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
        messenger = new Messenger(Messenger.contexts.INSPECTED_PAGE);
      });

      it('should have the context property set to CONTENT_SCRIPT', function () {
        expect(messenger.context).toBe(Messenger.contexts.INSPECTED_PAGE);
      });

      describe('.send', function () {
        it('should call window.postMessage with the targetContext set to CONTENT_SCRIPT', function () {
          messenger.send('some-message');

          expect(
            window.postMessage
            .withArgs(sinon.match.has('targetContext', Messenger.contexts.CONTENT_SCRIPT), '*')
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

          event.data.targetContext = Messenger.contexts.INSPECTED_PAGE;
          handler = sinon.stub();
          messenger.onRecieve(handler);

          window.addEventListener.callArgWith(1, event);

          expect(handler.withArgs(event.data.payload).callCount).toBe(1);
        });

        it('should not call the handler with event.data.payload when the listener is fired' +
           'and the targetContext is not INSPECTED_PAGE', function () {
          var handler;

          event.data.targetContext = Messenger.contexts.CONTENT_SCRIPT;
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
        messenger = new Messenger('some-invalid-context');
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
