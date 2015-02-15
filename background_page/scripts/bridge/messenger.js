'use strict';

define([
  'window'
  ],
  function (window) {
    var onRecieve,
        sendMessage;

    onRecieve = function onRecieve (handler) {
      window.addEventListener('message', handler);
    };

    sendMessage = function sendMessage (message) {
      window.postMessage(message, '*');
    };

    return {
      onRecieve: onRecieve,
      sendMessage: sendMessage
    };
  });
