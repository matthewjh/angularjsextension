module.exports = function (consts) {
  return {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    files: [
      'Gruntfile.js',
      consts.paths.backgroundPage + '**/*.js',
      consts.paths.app + '**/*.js'
    ]
  };
};
