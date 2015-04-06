'use strict';

/*
* Function producing a wrapped $rootScope with reporting via Reporter.
*/

define([
    'bridge/Reporter'
  ],
  function (Reporter) {
    var createNewPrototype,
        originalPrototype;

    createNewPrototype = function (originalPrototype, reporter) {
      var prototype,
          wrapper;

      wrapper = {
        $new: function (original$new) {
          var $digestDetectionWatch,
              childScope;

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

          // Pass original function bound with arguments as the first argument to the wrapper function
          wrapperFunctionArguments = Array.prototype.slice.call(arguments);
          wrapperFunctionArguments.unshift(callOriginalFunction.bind(this));

          return wrapper[methodName].apply(this, wrapperFunctionArguments);
        };
      });

      return prototype;
    };

    /**
     * Wraps angular's $rootScope, adding a new prototype into its prototype chain.
     * @param  {object} $rootScope $rootScope to wrap
     * @return {object} the wrapped $rootScope
     */
    return function ($rootScope) {
      var prototypeToInject,
          reporter;

      reporter = new Reporter();

      originalPrototype = Object.getPrototypeOf($rootScope);
      prototypeToInject = createNewPrototype(originalPrototype, reporter);

      // Need to do this so that isolate $scopes will have
      // our new prototype as their prototype
      $rootScope.constructor.prototype = prototypeToInject;

      Object.setPrototypeOf($rootScope, prototypeToInject);
      Object.setPrototypeOf(prototypeToInject, originalPrototype);

      return $rootScope;
    };

  });
