'use strict';

var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;
var onRequireJsReady;

var pathToModule = function(path) {
  return path.replace(/^\/base\/app\/scripts\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  console.log(file);
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

onRequireJsReady = function () {
  require(['angular'], function () {
    require(['angular-mocks'], function () {
      require(allTestFiles, function () {
        window.__karma__.start();
      });
    });
  });
};

require.config({
  baseUrl: '/base/app/scripts',

  paths: {
    'angular': '../../bower_components/angular/angular',
    'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
    'sinon': '../../bower_components/sinon/sinon-1.12.2'
  },

  shim: {
    angular: {
      exports: 'angular'
    },
    'angular-mocks': {
      exports: 'angular'
    }
  },

  callback: onRequireJsReady
});
