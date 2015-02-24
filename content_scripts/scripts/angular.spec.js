'use strict';

define([
  'angular-impl',
  'window'
  ],
  function (angular, window) {

    describe('angular module', function () {

      it('should export a defined value', function () {
        expect(angular).toBeDefined();
      });

    });

    describe('angular', function () {

      it('should be window.angular', function () {
        expect(angular).toBe(window.angular);
      });

    });
});
