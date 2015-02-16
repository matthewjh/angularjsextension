'use strict';

define([
  'window'
  ],
  function (window) {
    var Messenger
        raiseError;

    var raiseError = function (reason) {
      throw 'bridge/Messenger: ' + reason;
    };

    Messenger = function (context) {
      this.context = context;
    };

    Messenger.prototype.contexts = {
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
        case this.contexts.INSPECTED_PAGE:
          targetContext = this.contexts.CONTENT_SCRIPT;
          break;
        case this.contexts.CONTENT_SCRIPT:
          targetContext = this.contexts.INSPECTED_PAGE;
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
