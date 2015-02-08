module.exports = function (consts) {
  return {
    target: {
      rjsConfig: consts.paths.app + 'scripts/config.js'
    }
  };
};
