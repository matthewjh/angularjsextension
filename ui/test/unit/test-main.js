// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

System.baseURL = '/base';

System.paths = {
  '*': '/base/ui/*.js',
  '*.es6': '/base/ui/*.es6',
  'angular2/*': '/base/node_modules/angular2/es6/dev/es6/angular2/*.es6',
  'rtts_assert/*': '/base/node_modules/rtts_assert/es6/src/*.es6',
  'rx/*': '/base/node_modules/rx/*.js'
};

// Import all the specs, execute their `main()` method and kick off Karma (Jasmine).
System.import('angular2/src/dom/browser_adapter').then(function(browser_adapter) {
  browser_adapter.BrowserDomAdapter.makeCurrent();
}).then(function() {
  return Promise.all(
    Object.keys(window.__karma__.files) // All files served by Karma.
    .filter(onlySpecFiles)
    .map(filePathToModuleName)        // Normalize paths to module names.
    .map(function(path) {
      return System.import(path).then(function(module) {
        if (module.hasOwnProperty('main')) {
          module.main();
        } else {
          throw new Error('Module ' + path + ' does not implement main() method.');
        }
      });
    }));
})
.then(function() {
  __karma__.start();
}, function(error) {
  console.error(error.stack || error);
  __karma__.start();
});

function onlySpecFiles(path) {
  return /_spec\.js$/.test(path);
}

function filePathToModuleName(filePath) {
  console.log(filePath);
  return filePath.replace(/\\/g, '/')
    .replace(/^\/base\/ui\//, '')
    .replace(/\.js$/, '');
}
