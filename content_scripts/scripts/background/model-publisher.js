define([
  'window',
  'background/model'
  ], function (window, model) {
  'use strict';

  /**
   * Puts the model on the window object as the 'model' property.
   *
   * We need this because the DevTools page references the background page through the latter's window object.
   * It needs access to the model; therefore the model must be published onto the window object.
   */
  return function modelPublisher () {
    window.model = model;
  };
});
