'use strict';

define([
    'MessageForwarder',
    'config'
  ],
  function (MessageForwarder) {
    return function main () {
      var messageForwarder;

      messageForwarder = new MessageForwarder();
      messageForwarder.start();
    };
  });

