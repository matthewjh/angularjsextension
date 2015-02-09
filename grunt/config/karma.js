module.exports = function (consts) {
  return {
    app: {
      configFile: consts.paths.app + 'test/unit/karma.conf.js',
      singleRun: true
    }
  };
};
