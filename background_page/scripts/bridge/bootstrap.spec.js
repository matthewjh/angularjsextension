'use strict';

define([
  'bridge/bootstrap-impl'
  ],
  function (bootstrap) {

    describe('bootstrap module', function () {

      it('should export a defined value', function () {
        expect(bootstrap).toBeDefined();
      });

    });

    describe('when bootstrap is called', function () {
    });
});
