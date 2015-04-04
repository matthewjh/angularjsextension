'use strict';

define([
    'sinon'
  ],
  function (sinon) {
    return {
      connect: sinon.stub(),
      onConnect: {
        addListener: sinon.stub()
      }
    };
  });
