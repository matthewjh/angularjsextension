module.exports = function (consts) {
  return {
    app: {
      configFile: consts.paths.app + 'test/unit/karma.conf.js',
      singleRun: true
    },
    background_page: {
      configFile: consts.paths.contentScripts + 'test/unit/karma.conf.js',
      singleRun: true
    },
    ui: {
      configFile: consts.paths.ui + 'test/unit/karma.conf.es5.js',
      singleRun: true
    }
  };
};
