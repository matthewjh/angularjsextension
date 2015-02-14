'use strict';

define([
  'ng-decorator-impl',
  'angular'
  ],
  function (ngDecorator, angular) {

    describe('ng-decorator module', function () {

      it('should export a defined value', function () {
        expect(ngDecorator).toBeDefined();
      });

    });

    describe('ngDecorator', function () {

      describe('ngModule property', function () {

        it('should be angular.module(\'ng\')', function () {
          expect(ngDecorator.ngModule).toBe(angular.module('ng'));
        });

      });

    });
});
