require([
  'angular',
  ], function (angular) {
  'use strict';

  angular.module('angularJsExtension')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
});
