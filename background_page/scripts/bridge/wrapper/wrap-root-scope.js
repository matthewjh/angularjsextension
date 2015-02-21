'use strict';

define([],
  function () {
    var createNewPrototype,
        originalPrototype,
        wrapper;

    wrapper = {
      $digest: function (original$digest) {
        var modified$digest,
            $scopeTraversionLoopRegex,
            $scopeTraversionLoopReplacement,
            original$digestString,
            new$digestString,
            new$digest;

        console.log('$digest: ', this.$id);

        // Naughty...
        original$digestString = originalPrototype.$digest.toString();
        $scopeTraversionLoopRegex = /:do\s{/;
        $scopeTraversionLoopReplacement = ':do{ current.$digestHasBegun();';
        new$digestString = original$digestString.replace($scopeTraversionLoopRegex, $scopeTraversionLoopReplacement);
        new$digest = new Function('(' + new$digestString + ').bind(this)()').bind(this);

        debugger;
        return new$digest();
      },

      $new: function (original$new) {
        var childScope;

        console.log('$new: ', this.$id);

        childScope = original$new();

        return childScope;
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

      $rootScope.$$$anyScopeDigesting = false;

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
