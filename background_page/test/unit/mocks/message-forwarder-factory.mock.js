'use strict';

define([
  'factory-stub-factory'
  ],
  function (factoryStubFactory) {
    var messageForwarderFactory;

    messageForwarderFactory = factoryStubFactory();

    return messageForwarderFactory;
  });
