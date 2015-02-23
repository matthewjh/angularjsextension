'use strict';

define([
  'bridge/messenger-factory'
], function (messengerFactory) {
  var reporterFactory,
      types;

  types = {
    SCOPE_DIGEST: 0,
    SCOPE_CREATED: 1
  };

  reporterFactory = function () {
    var messenger;

    messenger = messengerFactory(messengerFactory.contexts.INSPECTED_PAGE);

    return {
      reportScopeDigest: function ($scope) {
        messenger.send({
          type: types.SCOPE_DIGEST,
          $scopeId: $scope.$id
        });
      },

      reportScopeCreated: function ($scope) {
        messenger.send({
          type: types.SCOPE_CREATED,
          $scopeId: $scope.$id
        });
      }
    };
  };

  reporterFactory.types = types;

  return reporterFactory;

});
