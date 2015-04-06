/*
 * Module to handle reports from the content script.
 *  It is intended that there will be one reportHandler per tab ID from which data is being received.
 */

define([
  'background/model'
  ],
  function (model) {
    'use strict';

    return function reportHandlerFactory (tabId) {
      model.tabs[tabId] = {};

    };
  });
