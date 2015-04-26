module.exports = function (consts) {
  return {
    background_page: {
      configFile: consts.paths.contentScripts + 'test/unit/karma.conf.js',
      singleRun: true
    },
    ui: {
      configFile: consts.paths.ui + 'test/unit/karma.conf.js',
      singleRun: true
    }
  };
};
