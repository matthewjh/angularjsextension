module.exports = function (consts) {
  return {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    app: {
      options: {
        ignores: [
          consts.paths.app + 'scripts/{,*/}*.spec.js'
        ]
      },
      src: [
        'Gruntfile.js',
        consts.paths.app + 'scripts/{,*/}*.js'
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
