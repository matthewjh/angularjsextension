'use strict';

define([
    'main-impl',
    'MessageForwarder',
    'sinon'
  ],
  function (main, MessageForwarder, sinon) {
    var mainImpl,
        MessageForwarderMock;

    beforeEach(function () {
      mainImpl = main.get();
      MessageForwarderMock = MessageForwarder.get();
    });

    describe('main', function () {
      var messageForwarder;

      beforeEach(function () {
        messageForwarder = {
          start: sinon.stub()
        };

        MessageForwarderMock.returns(messageForwarder);
      });

      it('should call .start on a messageForwarder instance', function () {
        mainImpl();

        expect(messageForwarder.start.callCount).toBe(1);
      });
    });
  })
;
