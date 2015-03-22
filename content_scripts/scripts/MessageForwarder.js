'use strict';

/*
* Forwards messages from content script to background page.
*/

define([
    'bridge/Messenger',
    'chrome-runtime'
  ],
  function (Messenger, chromeRuntime) {
    var MessageForwarder;

    MessageForwarder = function () {
      this._messenger = new Messenger(Messenger.contexts.CONTENT_SCRIPT);
      this._chromeExtensionPort = chromeRuntime.connect();
    };

    MessageForwarder.prototype.start = function () {
      var chromeExtensionPort = this._chromeExtensionPort;

      this._messenger.onReceive(function (payload) {
        chromeExtensionPort.postMessage(payload);
      });
    };

    return MessageForwarder;
  });
