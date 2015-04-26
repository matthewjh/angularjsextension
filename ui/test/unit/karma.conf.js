module.exports = function(config) {
  'use strict';

  config.set({
    autoWatch: false,

    basePath: '../../../',

    frameworks: ['jasmine', 'traceur'],

    files: [
      {pattern: 'ui/src/**/*.js', included: false},
      {pattern: 'node_modules/angular2/**/*.es6', included: false},
      {pattern: 'node_modules/rtts_assert/es6/src/rtts_assert.es6', included: false},

      'node_modules/traceur/bin/traceur.js',
      'node_modules/traceur/bin/traceur-runtime.js',
      'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',

      'ui/test/unit/test-main.js'
    ],

    exclude: [],

    port: 8080,

    browsers: [
      'ChromeCanary'
    ],

    preprocessors: {
      'modules/**/*.js': ['traceur'],
      'modules/**/*.es6': ['traceur']
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
        return fileName.replace(/\.es6$/, '.js');
      }
    }
  });
};
