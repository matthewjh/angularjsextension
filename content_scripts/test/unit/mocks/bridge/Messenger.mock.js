'use strict';

define([
  'ConstructorStub'
  ],
  function (ConstructorStub) {
    var Messenger;

    Messenger = new ConstructorStub();

    Messenger.contexts = {
      INSPECTED_PAGE: 0,
      CONTENT_SCRIPT: 1
    };

    return Messenger;
  });
