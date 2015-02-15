'use strict';

define([
  'sinon'
  ],
  function (sinon) {
    return {
      onRecieve: sinon.stub(),
      send: sinon.stub()
    };
  });
