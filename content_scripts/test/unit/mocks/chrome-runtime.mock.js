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

    return chromeRuntime;
  });
