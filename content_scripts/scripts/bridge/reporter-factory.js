'use strict';

define([
  'bridge/Messenger'
], function (Messenger) {
  var reporterFactory,
      types;

  types = {
    SCOPE_DIGEST: 0,
    SCOPE_CREATED: 1,
    SCOPE_DESTROYED: 2
  };

  reporterFactory = function () {
    var messenger;

    messenger = new Messenger(Messenger.contexts.INSPECTED_PAGE);

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
      },

      reportScopeDestroyed: function ($scope) {
        messenger.send({
          type: types.SCOPE_DESTROYED,
          $scopeId: $scope.$id
        });
      }
    };
  };

  reporterFactory.types = types;

  return reporterFactory;

});
