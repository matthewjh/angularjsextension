'use strict';

define([
  'chrome-runtime'
  ],
  function (chromeRuntime) {

    return function () {
      chromeRuntime.onConnect.addListener(function (port) {
        alert(port);
      });
    };
  });
