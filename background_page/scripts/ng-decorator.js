'use strict';

define([
  'angular'
  ],
  function (angular) {
    var getNgModule;

    getNgModule = function () {
      return angular.module('ng');
    }

    return {
      ngModule: getNgModule()
    };
  });
