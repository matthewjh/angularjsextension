module.exports = function (consts) {
  var angular2HeadDest = '.tmp/angular-HEAD',
      angular2DistDest = 'node_modules/angular';

  return {
    npmInstall: 'npm install',
    bowerInstall: 'bower install',

    // Angular 2
    cloneAngular2: 'git clone https://github.com/angular/angular.git ' + angular2HeadDest,
    buildAngular2: {
      cmd: 'npm install && gulp build.js',
      cwd: angular2HeadDest
    },
    copyBuiltAngular2: {
      cmd: 'cp -r dist ../../' + angular2DistDest,
      cwd: angular2HeadDest
    }
  };
};
