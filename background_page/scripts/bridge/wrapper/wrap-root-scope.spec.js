'use strict';

define([
    'bridge/wrapper/wrap-root-scope-impl',
    'bridge/reporter-factory',
    'sinon'
  ],
  function (wrapRootScope, reporterFactory, sinon) {
    var $rootScopePrototype,
        $rootScope,
        reporter;

    beforeEach(function () {
      var $rootScopeConstructor;

      $rootScopeConstructor = {};

      $rootScopePrototype = {
        constructor: $rootScopeConstructor,
        someProperty2: 'some-value',
        $digest: sinon.stub(),
        $new: sinon.stub(),
        $watch: sinon.stub()
      };

      $rootScopePrototype.$new.returns(Object.create($rootScopePrototype));
      $rootScopeConstructor.prototype = $rootScopePrototype;

      $rootScope = Object.create($rootScopePrototype);
      $rootScope.someProperty = 'some-value';

      reporter = {
        reportScopeDigest: sinon.stub(),
        reportScopeCreated: sinon.stub()
      };

      reporterFactory.returns(reporter);
    });

    describe('wrapRootScope module', function () {

      it('should export a function', function () {
        expect(wrapRootScope.constructor).toBe(Function);
      });

    });

    fdescribe('wrapped$rootScope (the return value of wrapRootScope)', function () {
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

      it('should preserve arbitrary properties on $rootScope', function () {
        expect(wrapped$rootScope.someProperty).toBe('some-value');
      });

      it('should expose arbitrary properties on the original $rootScope prototype', function () {
        expect($rootScope.someProperty2).toBe($rootScopePrototype.someProperty2);
      });

      describe('.$new', function () {
        it('should call $rootScopePrototype.$new with the same arguments', function () {
          wrapped$rootScope.$new('arg-1', 'arg-2');

          expect($rootScopePrototype.$new.withArgs('arg-1', 'arg-2').callCount).toBe(1);
        });

        it('should return the same thing as $rootScope.new', function () {
          expect(wrapped$rootScope.$new()).toBe($rootScopePrototype.$new());
        });

        it('should add a watcher onto the new scope', function () {
          wrapped$rootScope.$new();

          expect($rootScopePrototype.$watch.withArgs(sinon.match.func).callCount).toBe(1);
        });

        it('should add a watcher which, when fired, calls __isDigesting', function () {
          var childScope;

          childScope = wrapped$rootScope.$new();
          childScope.__isDigesting = sinon.stub();

          $rootScopePrototype.$watch.callArg(0);

          expect(childScope.__isDigesting.callCount).toBe(1);
        });

        it('should call reporter.reportScopeCreated with the correct arguments', function () {
          wrapped$rootScope.$new();

          expect(reporter.reportScopeCreated.withArgs(wrapped$rootScope).callCount).toBe(1);
        });
      });

      describe('.__isDigesting', function () {
        it('should call reporter.reportScopeDigest with the correct arguments', function () {
          wrapped$rootScope.__isDigesting();

          expect(reporter.reportScopeDigest.withArgs(wrapped$rootScope).callCount).toBe(1);
        });
      });
    });
  });
