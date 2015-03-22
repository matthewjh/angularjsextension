'use strict';

/*
* Handles messaging between content scripts and inspected page.
*/

define([
    'window'
  ],
  function (window) {
    var contexts,
        Messenger,
        raiseError;

    Messenger = function (context) {
      this._context = context;
    };

    Messenger.prototype.onReceive = function (handler) {
      var context;

      context = this._context;

      window.addEventListener('message', function (event) {
        if (event.data.targetContext === context) {
          handler(event.data.payload);
        }
      });
    };

    Messenger.prototype.send = function (messagePayload) {
      var message,
          targetContext;

      switch (this._context) {
        case contexts.INSPECTED_PAGE:
          targetContext = contexts.CONTENT_SCRIPT;
          break;
        case contexts.CONTENT_SCRIPT:
          targetContext = contexts.INSPECTED_PAGE;
          break;
        default:
          raiseError('invalid context: ' + this._context);
      }

      message = {
        payload: messagePayload,
        targetContext: targetContext
      };

      window.postMessage(message, '*');
    };

    raiseError = function (reason) {
      throw 'bridge/Messenger: ' + reason;
    };

    Messenger.contexts = contexts = {
      INSPECTED_PAGE: 0,
      CONTENT_SCRIPT: 1
    };

    return Messenger;
  });
