'use strict';

/*
* This module is always to be ran in the context of the inspected page.
*/

define([
  'angular',
  'bridge/wrapper/wrapper-module',
  'bridge/Messenger'
  ],
  function (angular, wrapperModule, Messenger) {
    var start,
        messenger;

    start = function () {
      var modules;

      modules = [];
      modules.push(wrapperModule);

      angular.resumeBootstrap(modules);
    };

    return start;
  });
