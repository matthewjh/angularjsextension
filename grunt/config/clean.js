module.exports = function (consts) {
  return {
    dist: {
      files: [{
        dot: true,
        src: [
          '.tmp',
          consts.paths.dist + '{,*/}*'
        ]
      }]
    },
    server: '.tmp',
    uiTests: 'tmp-ui-tests',
    angular2Head: '.tmp/angular-HEAD',
    angular2Dist: 'node_modules/angular'
  };
};
