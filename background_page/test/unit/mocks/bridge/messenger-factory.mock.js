'use strict';

define([
  'factory-stub-factory'
  ],
  function (factoryStubFactory) {
    var messengerFactory;

    messengerFactory = factoryStubFactory();

    messengerFactory.contexts = {
      INSPECTED_PAGE: 'inspected-page',
      CONTENT_SCRIPT: 'content-script'
    };

    return messengerFactory;
  });
