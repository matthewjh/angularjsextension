define([
  'bridge/wrapper/wrap-root-scope'
  ],
  function (wrapRootScope) {
    'use strict';

    var wrapperModule,
        wrappers;

    wrappers = {
      $rootScope: wrapRootScope
    };

    /**
     * Angular module to be loaded into the target app that will decorate built-in
     * angular services (e.g. $rootScope) with modified versions that are conducive to our own means.
     * @param  {$provide} angular's $provide service
     */
    wrapperModule = function ($provide) {
      for (var serviceName in wrappers) {
        $provide.decorator(serviceName, ['$delegate',  wrappers[serviceName]]);
      }
    };

    wrapperModule.$inject = ['$provide'];

    return wrapperModule;
  });
