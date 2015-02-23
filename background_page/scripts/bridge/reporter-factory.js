'use strict';

define([
  'bridge/messenger-factory'
], function (messengerFactory) {
  var reporterFactory,
      types;

  types = {
    REPORT_SCOPE_DIGEST: 0
  };

  reporterFactory = function () {
    var messenger;

    messenger = messengerFactory(messengerFactory.contexts.INSPECTED_PAGE);

    return {
      reportScopeDigest: function ($scope) {
        messenger.send({
          type: types.REPORT_SCOPE_DIGEST,
          $scopeId: $scope.$id
        });
      }
    };
  };

  reporterFactory.types = types;

  return reporterFactory;

});
