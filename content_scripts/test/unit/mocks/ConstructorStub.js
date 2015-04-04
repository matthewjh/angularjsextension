'use strict';

define([
    'sinon'
  ],
  function (sinon) {
    return function ConstructorStub () {
      var stub;

      stub = sinon.stub();

      return stub;
    };
  });
