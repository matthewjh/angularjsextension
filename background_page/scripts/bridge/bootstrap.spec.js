'use strict';

define([
  'bridge/bootstrap-impl',
  'bridge/messenger'
  ],
  function (bootstrap, messenger) {

    describe('bootstrap module', function () {

      it('should export a defined value', function () {
        expect(bootstrap).toBeDefined();
      });

    });

    describe('when bootstrap is called', function () {
      it('should call messenger.sendMessage', function () {
        bootstrap();

        expect(messenger.sendMessage.withArgs('hello, world').callCount).toBe(1);
      });
    });
});
