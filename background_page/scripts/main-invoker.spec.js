'use strict';

define([
    'main-invoker-impl',
    'main'
  ],
  function (mainInvoker, main) {

    describe('mainInvoker', function () {
      it('should call main', function () {
        expect(main.callCount).toBe(1);
      });
    });
  });
