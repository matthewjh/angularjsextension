module.exports = function (consts) {
  return {
    options: {
      // traceur options here
      experimental: true,
      copyRuntime: consts.paths.dist + consts.paths.ui
    },
    ui: {
      files: [{
        expand: true,
        cwd: consts.paths.ui,
        src: ['**/*.js'],
        dest: consts.paths.dist + consts.paths.ui
      }]
    },
  };
};
