define([
  'app',
  'controllers/main'
  ], function (app) {
  'use strict';
  var $controller,
      $scope,
      instantiateController;

  describe('MainController', function () {
    beforeEach(module(app.name));

    beforeEach(inject(function ($injector) {
      $scope = {};
      $controller = $injector.get('$controller');

      instantiateController = function () {
        return $controller('MainController', {
          $scope: $scope
        });
      };
    }));

    it('should put awesomeThings onto $scope', function () {
      instantiateController();

      expect($scope.awesomeThings).toBeDefined();
    });
  });
});
