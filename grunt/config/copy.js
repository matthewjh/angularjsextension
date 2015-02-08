module.exports = function (consts) {
  return {
    dist: {
      files: [{
        expand: true,
        dot: true,
        cwd: consts.paths.app,
        dest: consts.paths.dist + consts.paths.app,
        src: [
          '*.{ico,png,txt}',
          '.htaccess',
          'views/{,*/}*.html',
          'images/{,*/}*.{webp}',
          'fonts/*'
        ]
      }, {
        expand: true,
        dot: true,
        cwd: consts.paths.backgroundPage,
        dest: consts.paths.dist + consts.paths.backgroundPage,
        src: [
          '*.{ico,png,txt}',
          '.htaccess',
          'views/{,*/}*.html',
          'images/{,*/}*.{webp}',
          'fonts/*'
        ]
      }]
    },
    styles: {
      expand: true,
      cwd: consts.paths.app + 'styles',
      dest: '.tmp/styles/',
      src: '{,*/}*.css'
    }
  };
};
