module.exports = function (consts, grunt) {
  var distTplPath,
      files,
      getFileMapping;

  files = {};
  distTplPath = consts.paths.dist.replace(/\//, '_') + consts.templateSuffix + '/';

  files[consts.paths.dist + consts.paths.app + 'index.html'] = [distTplPath + consts.paths.app + 'index.html.' + consts.templateSuffix]
  files[consts.paths.dist + consts.paths.backgroundPage + 'index.html'] = [distTplPath + consts.paths.backgroundPage + 'index.html.' + consts.templateSuffix]
  files[consts.paths.dist + 'manifest.json'] = [distTplPath + 'manifest.json.' + consts.templateSuffix];

  getFileMapping = function getFileMapping () {
    var mapping,
        fullMapping,

    mapping = {
      app_js_path: consts.paths.app + 'main.js',
      app_css_path: consts.paths.app + 'styles/main.css',
      bg_js_path: consts.paths.backgroundPage + 'main.js',
    };

    fullMapping = {};

    for (var name in mapping) {
      var oldPath,
          newPath;

      oldPath =  consts.paths.dist + mapping[name];
      newPath = grunt.filerev.summary[oldPath].replace(consts.paths.dist, '');

      fullMapping[name] = '/' + newPath;
    }

    return fullMapping;
  };

  return {
    dist: {
      options: {
        data: getFileMapping
      },
      files: files
    }
  };
};
