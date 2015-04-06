define([
  'chrome-runtime',
  'background/report-handler-factory',
  'bridge/Reporter'
  ],
  function (chromeRuntime, reportHandlerFactory, Reporter) {
    'use strict';

    /**
     * Entry point for the background page.
     */
    return function main () {
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
      });
    };
  });
