module.exports = function (consts) {
  var projectFiles;

  projectFiles = [
    consts.paths.app + '{,*/}*.js',
    consts.paths.backgroundPage + '{,*/}*.js'
  ];

  return {
    build: {
      files: projectFiles,
      tasks: [
        'build'
      ]
    },
    test: {
      files: projectFiles,
      tasks: [
        'karma'
      ]
    },
    style: {
      files: projectFiles,
      tasks: [
        'jshint'
      ]
    },
  };
};
