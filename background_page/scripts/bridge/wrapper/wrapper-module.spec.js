'use strict';

define([
  'bridge/wrapper/wrapper-module-impl',
  'bridge/wrapper/wrap-root-scope',
  'sinon'
  ],
  function (wrapperModule, wrapRootScope, sinon) {

    describe('wrapperModule module', function () {

      it('should export a function', function () {
        expect(wrapperModule.constructor).toBe(Function);
      });

      it('should have the $inject property set to [\'$provide\']', function () {
        expect(wrapperModule.$inject).toEqual(['$provide']);
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
        wrapperModule($provide);

        expect($provide.decorator
          .withArgs('$rootScope', ['$delegate', wrapRootScope])
          .callCount).toBe(1);
      });
    });
});
