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
    server: '.tmp'
  };
};
