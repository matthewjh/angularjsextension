'use strict';

define([
    'sinon'
  ],
  function (sinon) {
    var angular = {
      resumeBootstrap: sinon.stub()
    };

    afterEach(function () {
      angular.resumeBootstrap.reset();
    });

    return angular;
  });
