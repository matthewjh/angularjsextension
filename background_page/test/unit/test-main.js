'use strict';

var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\/background_page\/scripts\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  baseUrl: '/base/background_page/scripts',
  paths: {
    'sinon': 'http://sinonjs.org/releases/sinon-1.12.2.js'
  },
  map: {
    '*': {
      'angular': '../test/unit/mocks/angular.mock',
      'window': '../test/unit/mocks/window.mock',
      'angular-impl': 'angular',
      'window-impl': 'window'
    }
  },
  callback: onRequireJsReady
});

// stub config module
define('config', [], function () {});

function onRequireJsReady () {
  require(allTestFiles, function () {
        window.__karma__.start();
  });
};
