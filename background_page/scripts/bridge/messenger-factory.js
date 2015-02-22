'use strict';

define([
    'window'
  ],
  function (window) {
    var contexts,
        messengerFactory,
        raiseError;

    contexts = {
      INSPECTED_PAGE: 0,
      CONTENT_SCRIPT: 1
    };

    raiseError = function (reason) {
      throw 'bridge/Messenger: ' + reason;
    };

    messengerFactory = function (context) {
      return {
        onReceive: function (handler) {
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
            case contexts.INSPECTED_PAGE:
              targetContext = contexts.CONTENT_SCRIPT;
              break;
            case contexts.CONTENT_SCRIPT:
              targetContext = contexts.INSPECTED_PAGE;
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

    messengerFactory.contexts = contexts;

    return messengerFactory;
  });
