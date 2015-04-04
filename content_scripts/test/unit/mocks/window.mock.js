'use strict';

define([
  'angular',
  'sinon'
  ],
  function (angular, sinon) {
    var window;

    window = {
      addEventListener: sinon.stub(),
      angular: angular,
      alert: sinon.stub(),
      postMessage: sinon.stub(),
      chrome: {
        runtime: {}
      }
    };

    return window;
  });
