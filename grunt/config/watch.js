module.exports = function (consts) {
  var projectFiles;

  projectFiles = [
    consts.paths.app + 'scripts/{,*/}*.js',
    consts.paths.backgroundPage + 'scripts/{,*/}*.js'
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
