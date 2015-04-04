'use strict';

define([
    'main-invoker-impl',
    'main'
  ],
  function (mainInvoker, main) {
    var mainInvokerImpl,
        mainMock;

    beforeEach(function () {
      mainInvokerImpl = mainInvoker.get();
      mainMock = main.get();
    });

    describe('mainInvoker', function () {
      it('should call main', function () {
        expect(mainMock.callCount).toBe(1);
      });
    });
  });
