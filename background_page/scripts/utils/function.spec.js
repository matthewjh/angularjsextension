'use strict';

define([
    'utils/function-impl'
  ],
  function (functionUtils) {
    describe('functionUtils', function () {

      describe('functionUtils module', function () {
        it('should export a defined value', function () {
          expect(functionUtils).toBeDefined();
        });
      });

      describe('.createClosure', function () {

        it('should return a function that returns the correct value', function () {
          var closure,
              functionWithNonLocals,
              nonLocals,
              x;

          x = 10;

          functionWithNonLocals = function (a, b) {
            return x + a + b;
          };

          nonLocals = {
            x: 5
          };

          closure = functionUtils.createClosure(functionWithNonLocals, nonLocals);

          expect(closure(2, 3)).toEqual(10);
        });

        it('should return a function that correctly binds \'this\' in the function being closed over', function () {
          var closure,
              fn,
              thisBinding;

          thisBinding = {};

          fn = function () {
            return this;
          };

          closure = functionUtils.createClosure(fn, {});

          expect(closure.call(thisBinding)).toBe(thisBinding);

        });


      });

    });
  });
