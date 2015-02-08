module.exports = function (consts) {
  return {
    options: {
      sassDir: consts.paths.app + 'styles',
      cssDir: '.tmp/styles',
      generatedImagesDir: '.tmp/images/generated',
      imagesDir: consts.paths.app + 'images',
      javascriptsDir: consts.paths.app + 'scripts',
      fontsDir: consts.paths.app + 'styles/fonts',
      importPath: './bower_components',
      httpImagesPath: '/images',
      httpGeneratedImagesPath: '/images/generated',
      httpFontsPath: '/styles/fonts',
      relativeAssets: false,
      assetCacheBuster: false,
      raw: 'Sass::Script::Number.precision = 10\n'
    },
    dist: {
      options: {
        generatedImagesDir: consts.paths.dist + 'images/generated'
      }
    }
  };
};
