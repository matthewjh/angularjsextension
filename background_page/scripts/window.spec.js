'use strict';

define([
  'window-impl'
  ],
  function (_window_) {
    describe('window module', function () {

      it('should export a defined value', function () {
        expect(_window_).toBeDefined();
      });

    });

    describe('window', function () {

      it('should be the global object "window"', function () {
        expect(_window_).toBe(window);
      });

    });
});
