'use strict';

define([
    'sinon'
  ],
  function (sinon) {
    var chromeRuntime = {
      connect: sinon.stub()
    };

    afterEach(function () {
      chromeRuntime.connect.reset();
    });

    return chromeRuntime;
  });
