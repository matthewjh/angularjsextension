'use strict';

define([
  ],
  function () {
    var createNewPrototype,
        wrapper;

    wrapper = {
      $digest: function (original$digest) {
        this.$$$digesting = true;
        this.$root.$$$anyScopeDigesting = true;

        console.log('$digest: ', this.$id);

        try {
          original$digest();
        } finally {
          this.$$$digesting = false;
          this.$root.$$$anyScopeDigesting = false;
        }
      },

      $new: function (original$new) {
        var first$$watchers,
            first$$childHead,
            childScope;

        console.log('$new: ', this.$id);

        childScope = original$new();
        childScope.$$$digesting = false;

        first$$watchers = childScope.$$watchers;
        first$$childHead = childScope.$$childHead;

        Object.defineProperties(childScope, {
          $$watchers: {
            get: function () {
              if (this.$root.$$$anyScopeDigesting) {
                childScope.$$$digesting = true;
                console.log('  begin $digest for: ', childScope.$id);
              }
              return this._$$watchers;
            },
            set: function (new$$watchers) {
              this._$$watchers = new$$watchers;
            }
          },
          $$childHead: {
            get: function () {
              if (childScope.$$$digesting) {
                console.log('  end $digest for: ', childScope.$id);
                childScope.$$$digesting = false;
              }
              return this._$$childHead;
            },
            set: function (new$$childHead) {
              this._$$childHead = new$$childHead;
            }
          }
        });

        childScope.$$watchers = first$$watchers;
        childScope.$$childHead = first$$childHead;

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
     var originalPrototype,
         prototypeToInject;

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
