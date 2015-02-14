define([
  'app',
  ], function (app) {
  'use strict';

  app.controller('MainController', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boiler plate',
      'AngularJS',
      'Karma'
    ];
  }]);
});
