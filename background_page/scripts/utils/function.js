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
      }
    };
  });
