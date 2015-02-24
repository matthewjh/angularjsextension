'use strict';

define([
    'bridge/Reporter'
  ],
  function (Reporter) {
    var createNewPrototype,
        originalPrototype,
        reporter,
        wrapper;

    wrapper = {
      $new: function (original$new) {
        var childScope,
            $digestDetectionWatch;

        $digestDetectionWatch = function () {
          reporter.reportScopeDigest(childScope);
        };

        childScope = original$new();
        childScope.$watch($digestDetectionWatch);

        reporter.reportScopeCreated(childScope);

        return childScope;
      },

      $destroy: function (original$destroy) {
        var returnValue;

        returnValue = original$destroy();

        reporter.reportScopeDestroyed(this);

        return returnValue;
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

      reporter = new Reporter();

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
