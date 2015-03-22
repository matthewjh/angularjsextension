'use strict';

define([
  'background/main-impl',
  'sinon',
  'chrome-runtime'
  ],
  function (main, sinon, chromeRuntime) {

    describe('background page main function', function () {
      beforeEach(function () {
        main();
      });

      it('should add a chrome runtime connection listener', function () {
        expect(chromeRuntime.onConnect.addListener.withArgs(sinon.match.func).callCount).toBe(1);
      });
    });
});
