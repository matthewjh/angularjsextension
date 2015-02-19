'use strict';

define([
  'window'
  ],
  function (window) {
    var Messenger,
        raiseError;

    raiseError = function (reason) {
      throw 'bridge/Messenger: ' + reason;
    };

    Messenger = function (context) {
      this.context = context;
    };

    Messenger.contexts = {
      INSPECTED_PAGE: 'inspected-page',
      CONTENT_SCRIPT: 'content-script'
    };

    Messenger.prototype.onRecieve = function (handler) {
      var context = this.context;

      window.addEventListener('message', function (event) {
        if (event.data.targetContext === context) {
          handler(event.data.payload);
        }
      });
    };

    Messenger.prototype.send = function (messagePayload) {
      var message,
          targetContext;

      switch (this.context) {
        case Messenger.contexts.INSPECTED_PAGE:
          targetContext = Messenger.contexts.CONTENT_SCRIPT;
          break;
        case Messenger.contexts.CONTENT_SCRIPT:
          targetContext = Messenger.contexts.INSPECTED_PAGE;
          break;
        default:
          raiseError('invalid context: ' + this.context);
      }

      message = {
        payload: messagePayload,
        targetContext: targetContext
      };

      window.postMessage(message, '*');
    };

    return Messenger;
  });
