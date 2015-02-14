'use strict';

define([
  'main-impl'
  ],
  function (main) {

    describe('main', function () {
      it('should equal "hello"', function () {
        expect(main).toEqual('hello');
      });
    });
});
