'use strict';

define([
    'sinon'
  ],
  function (sinon) {
    var chromeRuntime = {
      connect: sinon.stub(),
      onConnect: {
        addListener: sinon.stub()
      }
    };

    afterEach(function () {
      chromeRuntime.connect.reset();
      chromeRuntime.onConnect.addListener.reset();
    });

    return chromeRuntime;
  });
