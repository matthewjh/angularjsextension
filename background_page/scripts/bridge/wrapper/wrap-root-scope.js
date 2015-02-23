'use strict';

define([
    'bridge/reporter-factory'
  ],
  function (reporterFactory) {
    var createNewPrototype,
        originalPrototype,
        reporter,
        wrapper;

    wrapper = {
      $new: function (original$new) {
        var childScope,
            $digestDetectionWatch;

        $digestDetectionWatch = function () {
          childScope.__isDigesting();
        };

        childScope = original$new();
        childScope.$watch($digestDetectionWatch);

        reporter.reportScopeCreated(this);

        return childScope;
      },

      __isDigesting: function () {
        reporter.reportScopeDigest(this);
      }
    };

    createNewPrototype = function (originalPrototype) {
      var prototype;

      prototype = {};

      Object.keys(wrapper).forEach(function (methodName) {
        prototype[methodName] = function $rootScopeInjectedPrototypeMethod () {
          var callOriginalFunction,
              originalArguments,
              wrapperFunctionArguments;

          originalArguments = Array.prototype.slice.call(arguments);

          callOriginalFunction = function () {
            return originalPrototype[methodName].apply(this, originalArguments);
          };

          wrapperFunctionArguments = Array.prototype.slice.call(arguments);
          wrapperFunctionArguments.unshift(callOriginalFunction.bind(this));

          return wrapper[methodName].apply(this, wrapperFunctionArguments);
        };
      });

      return prototype;
    };

    return function ($rootScope) {
      var prototypeToInject;

      reporter = reporterFactory();

      originalPrototype = Object.getPrototypeOf($rootScope);
      prototypeToInject = createNewPrototype(originalPrototype);

      // Need to do this so that isolate $scopes will have
      // our new prototype as their prototype
      $rootScope.constructor.prototype = prototypeToInject;

      Object.setPrototypeOf($rootScope, prototypeToInject);
      Object.setPrototypeOf(prototypeToInject, originalPrototype);

      return $rootScope;
    };

  });
