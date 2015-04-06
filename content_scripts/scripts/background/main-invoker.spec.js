define([
    'background/main-invoker-impl',
    'background/main'
  ],
  function (mainInvoker, main) {
    'use strict';

    var mainInvokerImpl,
        mainMock;

    beforeEach(function () {
      mainInvokerImpl = mainInvoker.get();
      mainMock = main.get();
    });

    describe('background mainInvoker', function () {
      it('should call background main function', function () {
        expect(mainMock.callCount).toBe(1);
      });
    });
  });
