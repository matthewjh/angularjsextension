'use strict';

define([
  'sinon'
  ],
  function (sinon) {
    return {
      onRecieve: sinon.stub(),
      send: sinon.stub(),
      registerContextAsContentScript: sinon.stub(),
      registerContextAsInspectedPage: sinon.stub()
    };
  });
