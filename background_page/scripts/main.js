'use strict';

define([
    'message-forwarder-factory',
    'config'
  ],
  function (messageForwarderFactory) {
    return function main () {
      var messageForwarder;

      messageForwarder = messageForwarderFactory();
      messageForwarder.start();
    };
  });

