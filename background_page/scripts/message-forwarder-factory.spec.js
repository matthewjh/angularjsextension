'use strict';

define([
    'message-forwarder-factory-impl',
    'bridge/messenger-factory',
    'chrome-runtime',
    'sinon'
  ],
  function (messageForwarderFactory, messengerFactory, chromeRuntime, sinon) {

    describe('messageForwarder', function () {
      var chromeExtensionPort,
          messageForwarder,
          messenger;

      beforeEach(function () {
        messenger = {
          onReceive: sinon.stub()
        };

        messengerFactory.returns(messenger);

        chromeExtensionPort = {
          postMessage: sinon.stub()
        };

        chromeRuntime.connect.returns(chromeExtensionPort);

        messageForwarder = messageForwarderFactory();
      });


      it('should create a messenger under the CONTENT_SCRIPT context', function () {
        expect(messengerFactory.withArgs(messengerFactory.contexts.CONTENT_SCRIPT).callCount).toBe(1);
      });

      it('should create a connection to the extension via chromeRuntime.connect', function () {
        expect(chromeRuntime.connect.callCount).toBe(1);
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
