'use strict';

define([
    'sinon'
  ],
  function (sinon) {
    return function ConstructorStub () {
      var stub;

      stub = sinon.stub();

      afterEach(function () {
        stub.reset();
      });

      return stub;
    };
  });
