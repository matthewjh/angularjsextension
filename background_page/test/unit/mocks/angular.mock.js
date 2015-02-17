'use strict';

define([
  'sinon'
  ],
  function (sinon) {
    var angular = {
      resumeBootstrap: sinon.stub()
    };

    beforeEach(function () {
      angular.resumeBootstrap.reset();
    });

    return angular;
  });
