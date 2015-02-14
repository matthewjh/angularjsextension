'use strict';

define([
  'angular',
  'sinon'
  ],
  function (angular, sinon) {
    return {
      angular: angular,
      alert: sinon.stub()
    };
  });
