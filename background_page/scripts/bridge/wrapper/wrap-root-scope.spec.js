'use strict';

define([
  'bridge/wrapper/wrap-root-scope-impl'
  ],
  function (wrapRootScope) {
    var $rootScopePrototype,
        $rootScope;

    beforeEach(function () {
      var $rootScopeConstructor;

      $rootScopeConstructor = {};

      $rootScopePrototype = {
        constructor: $rootScopeConstructor,
        someProperty2: 'some-value',
        $digest: sinon.stub(),
        $new: sinon.stub()
      };

      $rootScopeConstructor.prototype = $rootScopePrototype;

      $rootScope = Object.create($rootScopePrototype);
      $rootScope.someProperty = 'some-value';
    });

    describe('wrapRootScope module', function () {

      it('should export a function', function () {
        expect(wrapRootScope.constructor).toBe(Function);
      });

    });

    describe('wrapped$rootScope (the return value of wrapRootScope)', function () {
      var original$rootScopeConstructorPrototype,
          wrapped$rootScope;

      beforeEach(function () {
        original$rootScopeConstructorPrototype = $rootScope.constructor.prototype;
        wrapped$rootScope = wrapRootScope($rootScope);
      });

      it('should have the same constructor as $rootScope', function () {
        expect(wrapped$rootScope.constuctor).toBe($rootScope.constuctor);
      });

      describe('wrapped$rootScope.constructor.prototype', function () {
        it('should be different from $rootScope.contructor.prototype', function () {
          expect(wrapped$rootScope.constructor.prototype).not.toBe(original$rootScopeConstructorPrototype);
        });

        it('should have original$rootScopeConstructorPrototype as its prototype', function () {
          expect(original$rootScopeConstructorPrototype.isPrototypeOf(wrapped$rootScope.constructor.prototype)).toBe(true);
        });
      });

      it('should still have $rootScopePrototype in its prototype chain', function () {
        expect($rootScopePrototype.isPrototypeOf(wrapped$rootScope)).toBe(true);
      });

      it('should preserve arbitary properties on $rootScope', function () {
        expect(wrapped$rootScope.someProperty).toBe('some-value');
      });

      it('should expose arbitary properties on the original $rootScope prototype', function () {
        expect($rootScope.someProperty2).toBe($rootScopePrototype.someProperty2);
      });

      describe('.$digest', function () {
        it('should call $rootScopePrototype.$digest with the same arguments', function () {
          wrapped$rootScope.$digest('arg-1', 'arg-2');

          expect($rootScopePrototype.$digest.withArgs('arg-1', 'arg-2').callCount).toBe(1);
        });

        it('should return the same thing as $rootScope.$digest', function () {
          var someValue;

          someValue = 5;

          $rootScopePrototype.$digest.returns(someValue);

          expect(wrapped$rootScope.$digest()).toBe(someValue);
        });
      });

      describe('.$new', function () {
        it('should call $rootScopePrototype.$new with the same arguments', function () {
          wrapped$rootScope.$new('arg-1', 'arg-2');

          expect($rootScopePrototype.$new.withArgs('arg-1', 'arg-2').callCount).toBe(1);
        });

        it('should return the same thing as $rootScope.$digest', function () {
          var someValue;

          someValue = 5;

          $rootScopePrototype.$new.returns(someValue);

          expect(wrapped$rootScope.$new()).toBe(someValue);
        });
      });
    });
});
