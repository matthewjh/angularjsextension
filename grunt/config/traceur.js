module.exports = function (consts) {
  return {
    options: {
      // traceur options here
      experimental: true,
      blockBinding: true,
      copyRuntime: consts.paths.dist + consts.paths.ui,
      modules: 'amd'
    }
  };
};
