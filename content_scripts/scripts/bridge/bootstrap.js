define([
  'angular',
  'bridge/wrapper/wrapper-module',
  'bridge/Messenger'
  ],
  function (angular, wrapperModule, Messenger) {
    'use strict';

    var start,
        messenger;

    /**
     * To be run inside the inspected page.
     *
     * Assuming that it has already been deferred, resumes the bootstrap of angular with our own module loaded in.
     */
    return function bootstrap () {
      var modules;

      modules = [];
      modules.push(wrapperModule);

      angular.resumeBootstrap(modules);
    };
  });
