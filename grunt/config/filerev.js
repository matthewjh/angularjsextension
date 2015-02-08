module.exports = function (consts) {
  return {
    dist: {
      src: [
        consts.paths.dist + consts.paths.app + '{,*/}*.js',
        consts.paths.dist + consts.paths.app + 'scripts/{,*/}*.js',
        consts.paths.dist + consts.paths.app + 'styles/{,*/}*.css'
      ]
    }
  };
};
