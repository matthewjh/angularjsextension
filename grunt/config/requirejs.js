module.exports = function (consts, grunt) {
  var addDevTargets,
      devOptimisation,
      prodOptimisation,
      options;

  devOptimisation = 'none';
  prodOptimisation = 'uglify';

  options = {
    app: {
      options: {
        baseUrl: consts.paths.app + 'scripts',
        mainConfigFile: consts.paths.app + 'scripts/config.js',
        out: consts.paths.dist + consts.paths.app + 'main.js',
        include: ['requirejs', 'app', 'main'],
        stubModules: ['config'],
        findNestedDependencies: true,
        wrap: true,
        optimize: prodOptimisation
      }
    },
    backgroundPage: {
      options: {
        baseUrl: consts.paths.backgroundPage + 'scripts',
        mainConfigFile: consts.paths.backgroundPage + 'scripts/config.js',
        out: consts.paths.dist + consts.paths.backgroundPage + 'main.js',
        include: ['requirejs', 'main'],
        stubModules: ['config'],
        findNestedDependencies: true,
        wrap: true,
        optimize: prodOptimisation
      }
    }
  };

  addDevTargets = function addDevTargets (options) {
    for (var target in options) {
      var devTargetOptions;

      devTargetOptions = grunt._.clone(options[target], true);
      devTargetOptions.options.optimize = devOptimisation;

      options[target + 'Dev'] = devTargetOptions;
    }

    return options;
  }

  addDevTargets(options);

  console.log(options);

  return options;
}
