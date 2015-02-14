module.exports = function (consts, grunt) {
  var distTplPath,
      getFiles,
      getFileMapping;

  distTplPath = consts.paths.dist.replace(/\//, '_') + consts.templateSuffix + '/';

  getFiles = function getFiles () {
    var files,
        glob;

    files = {};
    glob = require('glob');

    glob.sync('**/*.' + consts.templateSuffix, {cwd: distTplPath}).forEach(function (fileName) {
      var sourcePath,
          destPath;

      sourcePath = distTplPath + fileName;
      // strip out the template folder path for the real dist path, and remove suffix
      destPath = sourcePath.replace(distTplPath, consts.paths.dist)
                           .replace('.' + consts.templateSuffix, '');

      files[destPath] = sourcePath;
    });

    return files;
  };


  getFileMapping = function getFileMapping () {
    var mapping,
        fullMapping,

    mapping = {
      app_js_path: consts.paths.app + 'main.js',
      app_css_path: consts.paths.app + 'styles/main.css',
      bg_js_path: consts.paths.backgroundPage + 'main.js',
      devtools_js_path: consts.paths.app + 'scripts/devtools_background.js'
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
      files: getFiles()
    }
  };
};
