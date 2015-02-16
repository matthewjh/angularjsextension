'use strict';

define([
  'window'
  ],
  function (window) {
    var context,
        contexts,
        onRecieve,
        raiseError,
        registerContextAsContentScript,
        registerContextAsInspectedPage,
        send;

    contexts = {
      inspectedPage: 'inspected-page',
      contentScript: 'content-script'
    };

    raiseError = function raiseError (reason) {
      throw 'bridge/messenger: ' + reason;
    };

    registerContextAsContentScript = function registerContextAsContentScript () {
      context = contexts.contentScript;
    };

    registerContextAsInspectedPage = function registerContextAsInspectedPage () {
      context = contexts.inspectedPage;
    };

    onRecieve = function onRecieve (handler) {
      window.addEventListener('message', function (event) {
        if (event.data.targetContext === context) {
          handler(event.data.payload);
        }
      });
    };

    send = function send (messagePayload) {
      var message,
          targetContext;

      switch (context) {
        case contexts.inspectedPage:
          targetContext = contexts.contentScript;
          break;
        case contexts.contentScript:
          targetContext = contexts.inspectedPage;
          break;
        default:
          raiseError('invalid context: ' + context);
      }

      message = {
        payload: messagePayload,
        targetContext: targetContext
      };

      window.postMessage(message, '*');
    };

    return {
      onRecieve: onRecieve,
      registerContextAsContentScript: registerContextAsContentScript,
      registerContextAsInspectedPage: registerContextAsInspectedPage,
      send: send
    };
  });
