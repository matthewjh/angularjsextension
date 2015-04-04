'use strict';

define([
  'angular-impl',
  'window'
  ],
  function (angular, window) {
    var angularImpl,
        windowMock;

    beforeEach(function () {
      angularImpl = angular.get();
      windowMock = window.get();
    });

    describe('angular module', function () {
      it('should export a defined value', function () {
        expect(angularImpl).toBeDefined();
      });
    });

    describe('angular', function () {
      it('should be window.angular', function () {
        expect(angularImpl).toBe(windowMock.angular);
      });
    });
});
