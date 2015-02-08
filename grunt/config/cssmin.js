module.exports = function (consts) {
  var files = {};

  files[consts.paths.dist + consts.paths.app + 'styles/main.css'] = [
    '.tmp/styles/{,*/}*.css'
  ];

  return {
    dist: {
      files: files
    }
  };
};
