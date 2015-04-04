'use strict';

define([
    'chrome-runtime-impl',
    'window'
  ],
  function (chromeRuntime, window) {
    var chromeRuntimeImpl,
        windowMock;

    beforeEach(function () {
      chromeRuntimeImpl = chromeRuntime.get();
      windowMock = window.get();
    });

    describe('chromeRuntime', function () {
      it('should be window.chrome.runtime', function () {
        expect(chromeRuntimeImpl).toBe(windowMock.chrome.runtime);
      });
    });

  });
