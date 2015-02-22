'use strict';

define([
  'bridge/messenger-factory'
], function (messengerFactory) {

  return function reporterFactory () {
    var messenger;

    messenger = messengerFactory(messengerFactory.contexts.INSPECTED_PAGE);

    return {
      reportScopeDigest: function () {
        messenger.send('digestBegin');
      }
    };
  };

});
