'use strict';

define([
  'angular'
  ],
  function (angular) {
    var getNgModule;

    getNgModule = function getNgModule () {
      return angular.module('ng');
    }

    return {
      ngModule: getNgModule()
    };
  });
