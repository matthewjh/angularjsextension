'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  var consts,
      loadTasksConfig;

  grunt._ = require('lodash');

  consts = {
    paths: {
      app: 'app/',
      backgroundPage: 'background_page/',
      dist: 'dist/'
    },
    templateSuffix: 'tpl'
  };

  loadTasksConfig = function loadTasksConfig (path) {
    var config = {},
        glob = require('glob');

    glob.sync('*', {cwd: path}).forEach(function (fileName) {
      var taskName = fileName.replace(/\.js$/, '');

      config[taskName] = require(path + fileName)(consts, grunt);
    });

    return config;
  };

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig(loadTasksConfig('./grunt/config/'));

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    //'connect:test',
    'karma'
  ]);

  grunt.registerTask('build:dev', [
    'clean:dist',
    'concurrent:dist',
    'autoprefixer',
    'requirejs:appDev',
    'requirejs:backgroundPageDev',
    'copy:dist',
    'cssmin',
    'filerev',
    'template',
    'htmlmin'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'autoprefixer',
    'requirejs:app',
    'requirejs:backgroundPage',
    'copy:dist',
    'cssmin',
    'filerev',
    'template',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
