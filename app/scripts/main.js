'use strict';

define([
    'config'
  ],
  function () {
    require([
      'angular',
      'app',
      'controllers/main'
    ], function (angular, app) {
      angular.bootstrap(document, [app.name]);
    });
  });

