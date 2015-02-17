'use strict';

define([
  'bridge/wrapper/wrap-root-scope'
  ],
  function (wrapRootScope) {
    var wrapperMapping,
        wrapperModule;

    wrapperMapping = {
      $rootScope: wrapRootScope
    };

    wrapperModule = function ($provide) {
      for (var serviceName in wrapperMapping) {
        $provide.decorator(serviceName, ['$delegate', wrapperMapping[serviceName]]);
      }
    };

    wrapperModule.$inject = ['$provide'];

    return wrapperModule;
  });
