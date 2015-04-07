'use strict';

var allImplFiles,
    allTestFiles,
    getMockMap,
    getPathToModule,
    implModuleSuffix,
    implFileRegex,
    mockModulesPath,
    mockModuleSuffix,
    onRequireJsReady,
    testFileRegex;

allImplFiles = [];
allTestFiles = [];
implModuleSuffix = '-impl';
implFileRegex = /^\/base\/tmp-ui-tests.*\.js$/i;
mockModulesPath = '../test/unit/mocks/';
mockModuleSuffix = '.mock';
testFileRegex = /(spec|test)\.js$/i;

getPathToModule = function getPathToModule (path) {
  return path.replace(/^\/base\/tmp-ui-tests\//, '').replace(/\.js$/, '');
};

onRequireJsReady = function onRequireJsReady () {
  require(allTestFiles, function () {
    window.__karma__.start();
  });
};

Object.keys(window.__karma__.files).forEach(function (file) {
  if (!/bower_components/.test(file)) {
    if (testFileRegex.test(file)) {
      // Normalize paths to RequireJS module names.
      allTestFiles.push(getPathToModule(file));
    } else if (implFileRegex.test(file)) {
      allImplFiles.push(getPathToModule(file));
    }
  }
});

require.config({
  baseUrl: '/base/tmp-ui-tests',
  paths: {
    'sinon': '../../bower_components/sinon/sinon-1.12.2'
  },
  shim: {
    'sinon': {
      exports: 'sinon'
    }
  },
  callback: onRequireJsReady,

  // RequireJS.spec config
  mockPath: '/base/tmp-ui-tests/test/unit/mocks/',
  neverMock: [
    'sinon',
  ],
  verboseMode: false
});

// stub config module
define('config', [], function () {
});
