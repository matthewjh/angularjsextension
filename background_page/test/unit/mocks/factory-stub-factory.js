'use strict';

define([
    'sinon'
  ],
  function (sinon) {
    return function factoryStubFactory () {
      var stub;

      stub = sinon.stub();

      afterEach(function () {
        stub.reset();
      });

      return stub;
    };
  });
