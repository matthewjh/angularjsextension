'use strict';

define([
    'main-impl',
    'MessageForwarder',
    'sinon'
  ],
  function (main, MessageForwarder, sinon) {

    describe('main', function () {
      var messageForwarder;

      beforeEach(function () {
        messageForwarder = {
          start: sinon.stub()
        };

        MessageForwarder.returns(messageForwarder);
      });

      it('should call .start and on a messageForwarder instance', function () {
        main();

        expect(messageForwarder.start.callCount).toBe(1);
      });
    });
  })
;
