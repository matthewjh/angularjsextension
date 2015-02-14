'use strict';

define([
  'bridge/bootstrap-impl',
  'window'
  ],
  function (bootstrap, window) {

    describe('bootstrap module', function () {

      it('should export a defined value', function () {
        expect(bootstrap).toBeDefined();
      });

    });

    describe('when bootstrap is called', function () {
      it('should call window.alert', function () {
        bootstrap();

        expect(window.alert.callCount).toBe(1);
      });
    });
});
