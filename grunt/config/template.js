module.exports = function (consts, grunt) {
  var distTplPath,
      getFiles,
      getFileMapping,
      getTemplateVars;

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
      main_content_script_js_path: consts.paths.contentScripts + 'main.js',
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

  getTemplateVars = function getTemplateVars () {
    var vars,
        bridgeBootstrapPath,
        bridgeBootstrapSource;

    bridgeBootstrapPath = grunt.filerev.summary[consts.paths.bridgeBootstrap];
    bridgeBootstrapSource = grunt.file.read(bridgeBootstrapPath);

    vars = getFileMapping();
    vars.bridge_bootstrap_fn = new Function(bridgeBootstrapSource);

    return vars;
  };

  return {
    dist: {
      options: {
        data: getTemplateVars
      },
      files: getFiles()
    }
  };
};
