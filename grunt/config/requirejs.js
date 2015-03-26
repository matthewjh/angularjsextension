'use strict';

module.exports = function (consts, grunt) {
  var almondPath,
      addDevTargets,
      devOptimisation,
      prodOptimisation,
      options;

  almondPath = '../../bower_components/almond/almond';

  devOptimisation = 'none';
  prodOptimisation = 'uglify2';

  options = {
    app: {
      options: {
        name: almondPath,
        baseUrl: consts.paths.app + 'scripts',
        mainConfigFile: consts.paths.app + 'scripts/config.js',
        out: consts.paths.dist + consts.paths.app + 'main.js',
        include: ['main'],
        stubModules: ['config'],
        findNestedDependencies: true,
        wrap: true,
        optimize: prodOptimisation,
        insertRequire: ['main']
      }
    },
    contentScripts: {
      options: {
        name: almondPath,
        baseUrl: consts.paths.contentScripts + 'scripts',
        mainConfigFile: consts.paths.contentScripts + 'scripts/config.js',
        out: consts.paths.dist + consts.paths.contentScripts + 'main.js',
        include: ['main-invoker'],
        stubModules: ['config'],
        findNestedDependencies: true,
        wrap: true,
        optimize: prodOptimisation,
        insertRequire: ['main-invoker']
      }
    },
    bridgeBootstrap: {
      options: {
        name: almondPath,
        baseUrl: consts.paths.contentScripts + 'scripts',
        mainConfigFile: consts.paths.contentScripts + 'scripts/config.js',
        out: consts.paths.dist + consts.paths.contentScripts + 'bridge/bootstrap-self-executing.js',
        include: ['bridge/bootstrap-self-executing'],
        stubModules: ['config'],
        findNestedDependencies: true,
        wrap: true,
        optimize: prodOptimisation,
        insertRequire: ['bridge/bootstrap-self-executing']
      }
    },
    backgroundMain: {
      options: {
        name: almondPath,
        baseUrl: consts.paths.contentScripts + 'scripts',
        mainConfigFile: consts.paths.contentScripts + 'scripts/config.js',
        out: consts.paths.dist + consts.paths.contentScripts + 'background/main-invoker',
        include: ['background/main-invoker'],
        stubModules: ['config'],
        findNestedDependencies: true,
        wrap: true,
        optimize: prodOptimisation,
        insertRequire: ['background/main-invoker']
      }
    }
  };

  addDevTargets = function addDevTargets (options) {
    for (var target in options) {
      var devTargetOptions;

      devTargetOptions = grunt._.clone(options[target], true);

      // we don't want to use almond in development
      devTargetOptions.options.name = undefined;
      devTargetOptions.options.include.unshift('requirejs');

      devTargetOptions.options.optimize = devOptimisation;

      // Chrome CSP breaks useSourceUrl for DevTools pages :(
      if (target !== 'app') {
        devTargetOptions.options.useSourceUrl = true;
      }

      options[target + 'Dev'] = devTargetOptions;
    }

    return options;
  };

  addDevTargets(options);

  return options;
};
