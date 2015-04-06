'use strict';

define([
  'ConstructorStub'
  ],
  function (ConstructorStub) {
    var Reporter;

    Reporter = new ConstructorStub();

    Reporter.types = {
      SCOPE_DIGEST: 0,
      SCOPE_CREATED: 1,
      SCOPE_DESTROYED: 2
    };

    return Reporter;
  });
