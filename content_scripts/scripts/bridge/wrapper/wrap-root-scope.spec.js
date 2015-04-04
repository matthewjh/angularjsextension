'use strict';

define([
    'bridge/wrapper/wrap-root-scope-impl',
    'bridge/Reporter',
    'sinon'
  ],
  function (wrapRootScope, Reporter, sinon) {
    var $rootScopePrototype,
        $rootScope,
        reporter,
        ReporterMock,
        wrapRootScopeImpl;

    beforeEach(function () {
      var $rootScopeConstructor;

      ReporterMock = Reporter.get();
      wrapRootScopeImpl = wrapRootScope.get();

      $rootScopeConstructor = {};
      $rootScopePrototype = {
        constructor: $rootScopeConstructor,
        someProperty2: 'some-value',
        $digest: sinon.stub(),
        $new: sinon.stub(),
        $watch: sinon.stub(),
        $destroy: sinon.stub()
      };

      $rootScopePrototype.$new.returns(Object.create($rootScopePrototype));
      $rootScopeConstructor.prototype = $rootScopePrototype;

      $rootScope = Object.create($rootScopePrototype);
      $rootScope.someProperty = 'some-value';

      reporter = {
        reportScopeDigest: sinon.stub(),
        reportScopeCreated: sinon.stub(),
        reportScopeDestroyed: sinon.stub()
      };

      ReporterMock.returns(reporter);
    });

    describe('wrapRootScope module', function () {

      it('should export a function', function () {
        expect(wrapRootScopeImpl.constructor).toBe(Function);
      });

    });

    describe('wrapped $rootScope', function () {
      var original$rootScopeConstructorPrototype,
          wrapped$rootScope;

      beforeEach(function () {
        original$rootScopeConstructorPrototype = $rootScope.constructor.prototype;
        wrapped$rootScope = wrapRootScopeImpl($rootScope);
      });

      it('should have the same constructor as $rootScope', function () {
        expect(wrapped$rootScope.constuctor).toBe($rootScope.constuctor);
      });

      describe('wrapped$rootScope.constructor.prototype', function () {
        it('should be different from $rootScope.constructor.prototype', function () {
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

        it('should return the same thing as $rootScope.$new', function () {
          expect(wrapped$rootScope.$new()).toBe($rootScopePrototype.$new());
        });

        it('should add a watcher onto the new scope', function () {
          wrapped$rootScope.$new();

          expect($rootScopePrototype.$watch.withArgs(sinon.match.func).callCount).toBe(1);
        });

        it('should call reporter.reportScopeCreated with the correct arguments', function () {
          var childScope;

          childScope = wrapped$rootScope.$new();

          expect(reporter.reportScopeCreated.withArgs(childScope).callCount).toBe(1);
        });

        it('should add a watcher which, when fired, calls reporter.reportScopeDigest with the correct arguments', function () {
          var childScope;

          childScope = wrapped$rootScope.$new();

          $rootScopePrototype.$watch.callArg(0);

          expect(reporter.reportScopeDigest.withArgs(childScope).callCount).toBe(1);
        });
      });

      describe('.$destroy', function () {
        it('should call $rootScopePrototype.$destroy with the same arguments', function () {
          wrapped$rootScope.$destroy('arg-1', 'arg-2');

          expect($rootScopePrototype.$destroy.withArgs('arg-1', 'arg-2').callCount).toBe(1);
        });

        it('should return the same thing as $rootScope.$destroy', function () {
          expect(wrapped$rootScope.$destroy()).toBe($rootScopePrototype.$destroy());
        });

        it('should call reporter.reportScopeDestroyed with the correct arguments', function () {
          wrapped$rootScope.$destroy();

          expect(reporter.reportScopeDestroyed.withArgs(wrapped$rootScope).callCount).toBe(1);
        });
      });
    });
  });
