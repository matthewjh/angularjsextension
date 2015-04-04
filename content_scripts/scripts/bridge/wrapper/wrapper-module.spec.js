'use strict';

define([
  'bridge/wrapper/wrapper-module-impl',
  'bridge/wrapper/wrap-root-scope',
  'sinon'
  ],
  function (wrapperModule, wrapRootScope, sinon) {
    var wrapperModuleImpl,
        wrapRootScopeMock;

    beforeEach(function () {
      wrapperModuleImpl = wrapperModule.get();
      wrapRootScopeMock = wrapRootScope.get();
    });

    describe('wrapperModule module', function () {

      it('should export a function', function () {
        expect(wrapperModuleImpl.constructor).toBe(Function);
      });

      it('should have the $inject property set to [\'$provide\']', function () {
        expect(wrapperModuleImpl.$inject).toEqual(['$provide']);
      });

    });

    describe('when wrapperModule is called', function () {
      var $provide;

      beforeEach(function () {
        $provide = {
          decorator: sinon.stub()
        };
      });

      it('should call $provider.decorate(\'$rootScope\', ...)', function () {
        wrapperModuleImpl($provide);

        expect($provide.decorator
          .withArgs('$rootScope', ['$delegate', wrapRootScopeMock])
          .callCount).toBe(1);
      });
    });
});
