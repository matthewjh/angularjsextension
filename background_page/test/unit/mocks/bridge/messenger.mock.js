'use strict';

define([
  'sinon'
  ],
  function (sinon) {
    return {
      onRecieve: sinon.stub(),
      sendMessage: sinon.stub()
    };
  });
