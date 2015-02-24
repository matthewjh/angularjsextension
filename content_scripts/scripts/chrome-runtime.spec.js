'use strict';

define([
    'chrome-runtime-impl',
    'window'
  ],
  function (chromeRuntime, window) {

    describe('chromeRuntime', function () {
      it('should be window.chrome.runtime', function () {
        expect(chromeRuntime).toBe(window.chrome.runtime);
      });
    });

  });
