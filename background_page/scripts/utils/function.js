'use strict';

define([],
  function () {
    return {
      createClosure: function (targetFn, nonLocals) {
        var functionCtorArgs,
            nonLocalNames,
            nonLocalValues,
            nonLocalsProvider,
            targetFnIifeString;

        nonLocalValues = [];
        nonLocalNames = Object.keys(nonLocals);
        functionCtorArgs = nonLocalNames.slice();
        targetFnIifeString = 'return (' + targetFn.toString() + ').apply(this, targetFnArgs);';
        functionCtorArgs.push('targetFnArgs');
        functionCtorArgs.push(targetFnIifeString);
        nonLocalsProvider = Function.apply(Object.create(Function.prototype), functionCtorArgs);

        nonLocalNames.forEach(function (name) {
          nonLocalValues.push(nonLocals[name]);
        });

        return function () {
          var argumentsArray,
              nonLocalsProviderArgs;

          argumentsArray = Array.prototype.slice.call(arguments);
          nonLocalsProviderArgs = nonLocalValues.slice();

          nonLocalsProviderArgs.push(argumentsArray);
          return nonLocalsProvider.apply(this, nonLocalsProviderArgs);
        };
      },

      createMinSafeClosure: function (targetFn, nonMinNonLocals, sourceMap) {
        var minNonLocals,
            nonMinNonLocalNames;

        minNonLocals = {};
        nonMinNonLocalNames = Object.keys(nonMinNonLocals);

        nonMinNonLocalNames.forEach(function (name) {
          var minNonLocalName;

          minNonLocalName = sourceMap.get(name);
          minNonLocals[minNonLocalName] = nonMinNonLocals[name];
        });

        return this.createClosure(targetFn, minNonLocals);
      }
    };
  });
