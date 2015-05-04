module.exports = function(config) {
  'use strict';

  config.set({
    autoWatch: false,

    basePath: '../../../',

    frameworks: ['jasmine', 'traceur'],

    files: [
      // Non-included scripts + source maps
      {pattern: 'ui/src/**/*.js', included: false},
      {pattern: 'ui/src/**/*.js.map', included: false},
      {pattern: 'node_modules/angular2/**/*.es6', included: false},
      {pattern: 'node_modules/angular2/**/*.map', included: false},
      {pattern: 'node_modules/rtts_assert/es6/src/*.es6', included: false},
      {pattern: 'node_modules/rtts_assert/es6/src/*.map', included: false},
      {pattern: 'node_modules/rx/**/*.js', included: false},
      {pattern: 'node_modules/rx/**/*.js.map', included: false},

      // Included scripts + source maps
      'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
      {pattern: 'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map', included: false},
      'node_modules/systemjs/dist/system.js',
      {pattern: 'node_modules/systemjs/dist/system.js.map', included: false},
      'node_modules/zone.js/zone.js',
      'node_modules/zone.js/long-stack-trace-zone.js',

      'ui/test/unit/test-main.js'
    ],

    exclude: [],

    port: 8080,

    browsers: [
      'ChromeCanary'
    ],

    preprocessors: {
      'ui/src/**/*.js': ['traceur'],
      '**/*.es6': ['traceur']
    },

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-traceur-preprocessor'
    ],

    singleRun: false,

    colors: true,

    logLevel: config.LOG_INFO,

    traceurPreprocessor: {
      options: {
        outputLanguage: 'es5',
        sourceMaps: true,
        script: false,
        memberVariables: true,
        modules: 'instantiate',
        types: true,
        typeAssertions: true,
        typeAssertionModule: 'node_modules/rtts_assert/es6/src/rtts_assert.es6',
        annotations: true
      },
      transformPath: function(fileName) {
        // By default karma-traceur-preprocessor will replace .es6 extensions with .js.
        // We don't want that here.
        return fileName;
      }
    }
  });
};
