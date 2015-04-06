define([
  'background/model'
  ],
  function (model) {
    'use strict';

    /**
     * Create a report handler to handle reports from the content script by updating the model
     * accordingly.
     *
     * There should be one reportHandler per tab that is used with the extension.
     *
     * @param {integer} tabId unique ID of tab to which this report handler pertains.
     * @return {object}
     */
    return function reportHandlerFactory (tabId) {
      var tabModel;

      tabModel = model.tabs[tabId] = {
        scopes: {}
      };

      return {
        /**
         * Handle a scope created report from a {@link Reporter}.
         * @param {object} report the report to handle.
         */
        handleScopeCreated: function (report) {
          tabModel.scopes[report.$scopeId] = {
            id: report.$scopeId,
            isDigesting: false,
            isDestroyed: false
          };
          alert(JSON.stringify(model));
        },

        /**
         * Handle a scope digest report from a {@link Reporter}.
         * @param {object} report the report to handle.
         */
        handleScopeDigest: function (report) {
          tabModel.scopes[report.$scopeId].isDigesting = true;
        },

        /**
         * Handle a scope destroyed report from a {@link Reporter}.
         * @param {object} report the report to handle.
         */
        handleScopeDestroyed: function (report) {
          tabModel.scopes[report.$scopeId].isDestroyed = true;
        }
      };
    };
  });
