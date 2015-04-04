'use strict';

define([
    'sinon'
  ],
  function (sinon) {
    return function ConstructorStub () {
      return sinon.stub();
    };
  });
