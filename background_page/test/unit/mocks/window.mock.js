'use strict';

define([
  'angular',
  'sinon'
  ],
  function (angular, sinon) {
    return {
      addEventListener: sinon.stub(),
      angular: angular,
      alert: sinon.stub(),
      postMessage: sinon.stub()
    };
  });
