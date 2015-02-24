'use strict';

define([
  'bridge/bootstrap-impl',
  'bridge/wrapper/wrapper-module',
  'angular'
  ],
  function (bootstrap, wrapperModule, angular) {

    describe('bootstrap module', function () {

      it('should export a defined value', function () {
        expect(bootstrap).toBeDefined();
      });

    });

    describe('when bootstrap is called', function () {
      it('should call angular.resumeBootstrap with [wrapperModule]', function () {
        bootstrap();

        expect(angular.resumeBootstrap
          .withArgs([wrapperModule])
          .callCount).toBe(1);
      });
    });
});
