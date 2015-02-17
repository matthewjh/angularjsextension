'use strict';

define([
  'bridge/wrapper/wrap-root-scope'
  ],
  function (wrapRootScope) {
    var wrappers,
        wrapperModule;

    wrappers = {
      $rootScope: wrapRootScope
    };

    wrapperModule = function ($provide) {
      for (var serviceName in wrappers) {
        $provide.decorator(serviceName, ['$delegate',  wrappers[serviceName]]);
      }
    };

    wrapperModule.$inject = ['$provide'];

    return wrapperModule;
  });
