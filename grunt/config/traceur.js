module.exports = function (consts) {
  return {
    options: {
      // traceur options here
      experimental: true,
      blockBinding: true,
      copyRuntime: consts.paths.dist + consts.paths.ui
    },
    ui: {
      files: [{
        expand: true,
        cwd: consts.paths.ui,
        src: ['**/*[!spec].js'],
        dest: consts.paths.dist + consts.paths.ui
      }]
    },
    uiTests: {
      files: [{
        expand: true,
        cwd: consts.paths.ui,
        src: ['**/*[!es5].js'],
        dest: 'tmp-ui-tests/'
      }]
    },
  };
};
