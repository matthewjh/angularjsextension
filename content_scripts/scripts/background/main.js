'use strict';

define([
  'chrome-runtime'
  ],
  function (chromeRuntime) {

    return function main () {
      chromeRuntime.onConnect.addListener(function (port) {
        port.onMessage.addListener(function (message) {
          alert(JSON.stringify(message));
        });
      });
    };
  });
