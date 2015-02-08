module.exports = function (consts) {
  return {
    bower: {
      files: ['bower.json'],
      tasks: ['bowerRequirejs']
    },
    js: {
      files: [consts.paths.app + 'scripts/{,*/}*.js'],
      tasks: ['newer:jshint:all'],
      options: {
        livereload: '<%= connect.options.livereload %>'
      }
    },
    jsTest: {
      files: ['test/spec/{,*/}*.js'],
      tasks: ['newer:jshint:test', 'karma']
    },
    compass: {
      files: [consts.paths.app + 'styles/{,*/}*.{scss,sass}'],
      tasks: ['compass:server', 'autoprefixer']
    },
    gruntfile: {
      files: ['Gruntfile.js']
    },
    livereload: {
      options: {
        livereload: '<%= connect.options.livereload %>'
      },
      files: [
        consts.paths.app + '{,*/}*.html',
        '.tmp/styles/{,*/}*.css',
        consts.paths.app + 'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
      ]
    }
  };
};
