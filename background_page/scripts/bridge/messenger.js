'use strict';

define([
  'window'
  ],
  function (window) {
    var onRecieve,
        send;

    onRecieve = function onRecieve (handler) {
      window.addEventListener('message', function (event) {
        handler(event.data);
      });
    };

    send = function send (message) {
      window.postMessage(message, '*');
    };

    return {
      onRecieve: onRecieve,
      send: send
    };
  });
