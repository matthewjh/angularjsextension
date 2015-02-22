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

      describe('.createMinSafeClosure', function () {
        var sourceMap;

        beforeEach(function () {
          sourceMap = {
            get: function (keys) {
              var map;

              map = {
                nonMinVar1: 'minVar1',
                nonMinVar2: 'minVar2'
              };

              return map[keys];
            }
          };
        });

        it('should create a closure that correctly uses the source map for non-local names', function () {
          var closure,
              functionWithMinNonLocals,
              minVar1,
              minVar2,
              nonMinNonLocals;

          functionWithMinNonLocals = function (nonMinVar3) {
            return minVar1 + minVar2 + nonMinVar3;
          };

          nonMinNonLocals = {
            nonMinVar1: 1,
            nonMinVar2: 2
          };

          closure = functionUtils.createMinSafeClosure(functionWithMinNonLocals, nonMinNonLocals, sourceMap);

          expect(closure(5)).toBe(8);
        });
      });

    });
  });
