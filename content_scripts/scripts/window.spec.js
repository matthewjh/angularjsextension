'use strict';

define([
  'window-impl'
  ],
  function (_window_) {
    var windowImpl;

    beforeEach(function () {
      windowImpl = _window_.get();
    });

    describe('window module', function () {

      it('should export a defined value', function () {
        expect(windowImpl).toBeDefined();
      });

    });

    describe('window', function () {

      it('should be the global object "window"', function () {
        expect(windowImpl).toEqual(window);
      });

    });
});
