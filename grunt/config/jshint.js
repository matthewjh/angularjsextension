module.exports = function (consts) {
  return {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    app: {
      src: [
        'Gruntfile.js',
        consts.paths.app + 'scripts/{,*/}*[!spec].js'
      ]
    },
    test: {
      options: {
        jshintrc: consts.paths.app + 'test/unit/.jshintrc'
      },
      src: [consts.paths.app + 'scripts/{,*/}*.spec.js']
    }
  };
};
