module.exports = function (consts) {
  return {
    app: {
      configFile: consts.paths.app + 'test/unit/karma.conf.js',
      singleRun: true
    },
    background_page: {
      configFile: consts.paths.backgroundPage + 'test/unit/karma.conf.js',
      singleRun: true
    }
  };
};
