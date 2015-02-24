'use strict';

define([
  'factory-stub-factory'
  ],
  function (factoryStubFactory) {
    var messengerFactory;

    messengerFactory = factoryStubFactory();

    messengerFactory.contexts = {
      INSPECTED_PAGE: 0,
      CONTENT_SCRIPT: 1
    };

    return messengerFactory;
  });
