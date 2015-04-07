define([
  'chrome-runtime',
  'background/publish-model',
  'background/report-handler-factory',
  'bridge/Reporter'
  ],
  function (chromeRuntime, publishModel, reportHandlerFactory, Reporter) {
    'use strict';

    /**
     * Entry point for the background page.
     *
     * Adds listeners to handle messages from the content scripts and to use them to adjust the model.
     *
     * Publishes the model onto the global object (window).
     */
    return function main () {
      publishModel();

      chromeRuntime.onConnect.addListener(function (port) {
        var reportHandler;

        reportHandler = reportHandlerFactory(port.sender.tab.id);

        port.onMessage.addListener(function (message) {
          // Dispatch message to correct reportHandler method based on its type
          switch (message.type) {
            case Reporter.types.SCOPE_CREATED:
              reportHandler.handleScopeCreated(message);
              break;
            case Reporter.types.SCOPE_DESTROYED:
              reportHandler.handleScopeDestroyed(message);
              break;
            case Reporter.types.SCOPE_DIGEST:
              reportHandler.handleScopeDigest(message);
              break;
          }
        });

        port.onDisconnect.addListener(function () {
          reportHandler.dispose();
        });
      });
    };
  });
