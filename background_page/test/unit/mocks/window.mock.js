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
      postMessage: sinon.stub()
    };

    beforeEach(function () {
      window.addEventListener.reset();
      window.alert.reset();
      window.postMessage.reset();
    });

    return window;
  });
