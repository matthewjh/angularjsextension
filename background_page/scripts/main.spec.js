'use strict';

define([
    'main-impl',
    'message-forwarder-factory',
    'sinon'
  ],
  function (main, messageForwarderFactory, sinon) {

    describe('main', function () {
      var messageForwarder;

      beforeEach(function () {
        messageForwarder = {
          start: sinon.stub()
        };

        messageForwarderFactory.returns(messageForwarder);
      });

      it('should call .start and on a messageForwarder instance', function () {
        main();

        expect(messageForwarder.start.callCount).toBe(1);
      });
    });
  })
;
