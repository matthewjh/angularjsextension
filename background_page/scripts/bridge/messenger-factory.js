'use strict';

define([
    'window'
  ],
  function (window) {
    var messengerFactory,
        raiseError;

    raiseError = function (reason) {
      throw 'bridge/Messenger: ' + reason;
    };

    messengerFactory = function (context) {
      return {
        onRecieve: function (handler) {
          window.addEventListener('message', function (event) {
            if (event.data.targetContext === context) {
              handler(event.data.payload);
            }
          });
        },

        send: function (messagePayload) {
          var message,
              targetContext;

          switch (context) {
            case messengerFactory.contexts.INSPECTED_PAGE:
              targetContext = messengerFactory.contexts.CONTENT_SCRIPT;
              break;
            case messengerFactory.contexts.CONTENT_SCRIPT:
              targetContext = messengerFactory.contexts.INSPECTED_PAGE;
              break;
            default:
              raiseError('invalid context: ' + context);
          }

          message = {
            payload: messagePayload,
            targetContext: targetContext
          };

          window.postMessage(message, '*');
        }
      };
    };

    messengerFactory.contexts = {
      INSPECTED_PAGE: 'inspected-page',
      CONTENT_SCRIPT: 'content-script'
    };

    return messengerFactory;
  });
