'use strict';

define([
  'bridge/wrapper/wrap-root-scope-impl'
  ],
  function (wrapRootScope) {

    describe('wrapRootScope module', function () {

      it('should export a function', function () {
        expect(wrapRootScope.constructor).toBe(Function);
      });

    });

    describe('when wrapRootScope is called', function () {
    });
});
