module.exports = function (consts) {
  return {
    dist: {
      options: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseBooleanAttributes: true,
        removeCommentsFromCDATA: true,
        removeOptionalTags: true
      },
      files: [{
        expand: true,
        cwd: consts.paths.dist,
        src: ['*.html', 'views/{,*/}*.html'],
        dest: consts.paths.dist
      }]
    }
  };
};
