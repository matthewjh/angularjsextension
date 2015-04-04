'use strict';

define([
    'MessageForwarder-impl',
    'bridge/Messenger',
    'chrome-runtime',
    'sinon'
  ],
  function (MessageForwarder, Messenger, chromeRuntime, sinon) {
    var chromeRuntimeMock,
        MessageForwarderImpl,
        MessengerMock;

    beforeEach(function () {
      chromeRuntimeMock = chromeRuntime.get();
      MessageForwarderImpl = MessageForwarder.get()
      MessengerMock = Messenger.get();
    });

    describe('messageForwarder', function () {
      var chromeExtensionPort,
          messageForwarder,
          messenger;

      beforeEach(function () {
        messenger = {
          onReceive: sinon.stub()
        };

        MessengerMock.returns(messenger);

        chromeExtensionPort = {
          postMessage: sinon.stub()
        };

        chromeRuntimeMock.connect.returns(chromeExtensionPort);

        messageForwarder = new MessageForwarderImpl();
      });


      it('should create a messenger under the CONTENT_SCRIPT context', function () {
        expect(MessengerMock.withArgs(MessengerMock.contexts.CONTENT_SCRIPT).callCount).toBe(1);
      });

      it('should create a connection to the extension via chromeRuntime.connect', function () {
        expect(chromeRuntimeMock.connect.callCount).toBe(1);
      });

      describe('.start', function () {
        it('should add a listener via messenger.onReceive', function () {
          messageForwarder.start();

          expect(messenger.onReceive.withArgs(sinon.match.func).callCount).toBe(1);
        });

        describe('when the messenger.onReceive listener is fired', function () {
          beforeEach(function () {
            messageForwarder.start();
          });

          it('should forward to message via postMessage on the chrome port', function () {
            var messagePayload;

            messagePayload = {};
            messenger.onReceive.callArgWith(0, messagePayload);

            expect(chromeExtensionPort.postMessage.withArgs(messagePayload).callCount).toBe(1);
          });
        });
      });
    });

  });
