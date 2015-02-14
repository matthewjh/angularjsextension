'use strict';

define([],
  function () {
    var modules;

    modules = {};

    return {
      module: function (moduleName, moduleDependencies) {
        if (!modules[moduleName]) {
          modules[moduleName] = {
            name: moduleName
          };
        }

        return modules[moduleName];
      }
    };
  });
