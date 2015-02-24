'use strict';

define([
    'bridge/messenger-factory',
    'chrome-runtime'
  ],
  function (messengerFactory, chromeRuntime) {

    return function messageForwarderFactory () {
      var messenger,
          chromeExtensionPort;

      messenger = messengerFactory(messengerFactory.contexts.CONTENT_SCRIPT);


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
