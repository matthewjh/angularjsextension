/*
 * Module to handle reports from the content script, updating the background page's model accordingly.
 * It is intended that there will be one reportHandler per tab ID from which data is being received.
 */

define([
  'background/model'
  ],
  function (model) {
    'use strict';

    return function reportHandlerFactory (tabId) {
      var tabModel;

      tabModel = model.tabs[tabId] = {
        scopes: []
      };

      return {
        handleScopeCreated: function (scopeInfo) {
          tabModel.scopes[scopeInfo.$scopeId] = {
            id: scopeInfo.$scopeId,
            isDigesting: false
          };
        },

        handleScopeDigest: function (scopeInfo) {
          tabModel.scopes[scopeInfo.$scopeId].isDigesting = true
        }
      };
    };
  });
