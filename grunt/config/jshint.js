module.exports = function (consts) {
  return {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    files: [
      'Gruntfile.js',
      consts.paths.contentScripts + '**/*.js',
      consts.paths.app + '**/*.js'
    ]
  };
};
