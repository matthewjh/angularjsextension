'use strict';

define([
  'main-impl',
  'bridge/messenger',
  'window',
  'sinon'
  ],
  function (main, messenger, window, sinon) {

    describe('main', function () {
      it('should call messenger.onRecieve', function () {
        expect(messenger.onRecieve.withArgs(sinon.match.func).callCount).toBe(1);
      });

      describe('messenger.onRecieve handler', function () {
        it('should call window.alert with the passed event', function () {
          var event;

          event = 'some-event';

          messenger.onRecieve.callArgWith(0, event);

          expect(window.alert.withArgs(event).callCount).toBe(1);
        });
      });
    });
});
