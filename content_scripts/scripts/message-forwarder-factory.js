'use strict';

define([
    'bridge/Messenger',
    'chrome-runtime'
  ],
  function (Messenger, chromeRuntime) {

    return function messageForwarderFactory () {
      var messenger,
          chromeExtensionPort;

      messenger = new Messenger(Messenger.contexts.CONTENT_SCRIPT);


      chromeExtensionPort = chromeRuntime.connect();

      return {
        start: function () {
          messenger.onReceive(function (payload) {
            chromeExtensionPort.postMessage(payload);
          });
        }
      };
    };
  });
