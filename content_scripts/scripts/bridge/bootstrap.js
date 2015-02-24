'use strict';

/*
* This module is always to be ran in the context of the inspected page.
*/

define([
  'angular',
  'bridge/wrapper/wrapper-module'
  ],
  function (angular, wrapperModule) {
    var start;

    start = function () {
      var modules;

      modules = [];
      modules.push(wrapperModule);

      angular.resumeBootstrap(modules);
    };

    return start;
  });
