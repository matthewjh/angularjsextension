define([
  'background/main-impl',
  'sinon',
  'chrome-runtime'
  ],
  function (main, sinon, chromeRuntime) {
    'use strict';

    var chromeRuntimeMock,
        mainImpl;

    beforeEach(function () {
      chromeRuntimeMock = chromeRuntime.get();
      mainImpl = main.get();
    });

    describe('background page main function', function () {
      beforeEach(function () {
        mainImpl();
      });

      it('should add a chrome runtime connection listener', function () {
        expect(chromeRuntimeMock.onConnect.addListener.withArgs(sinon.match.func).callCount).toBe(1);
      });
    });
});
