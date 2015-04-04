'use strict';

define([
  'bridge/bootstrap-impl',
  'bridge/wrapper/wrapper-module',
  'angular'
  ],
  function (bootstrap, wrapperModule, angular) {
    var bootstrapImpl,
        wrapperModuleMock,
        angularMock;

    beforeEach(function () {
      bootstrapImpl = bootstrap.get();
      wrapperModuleMock = wrapperModule.get();
      angularMock = angular.get();
    })

    describe('bootstrap module', function () {

      it('should export a defined value', function () {
        expect(bootstrapImpl).toBeDefined();
      });

    });

    describe('when bootstrap is called', function () {
      it('should call angular.resumeBootstrap with [wrapperModule]', function () {
        bootstrapImpl();

        expect(angularMock.resumeBootstrap
          .withArgs([wrapperModuleMock])
          .callCount).toBe(1);
      });
    });
});
