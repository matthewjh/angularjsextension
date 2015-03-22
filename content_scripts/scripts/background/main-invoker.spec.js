'use strict';

define([
    'background/main-invoker-impl',
    'background/main'
  ],
  function (mainInvoker, main) {

    describe('background mainInvoker', function () {
      it('should call background main function', function () {
        expect(main.callCount).toBe(1);
      });
    });
  });