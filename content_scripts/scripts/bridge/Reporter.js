'use strict';

/*
* Abstraction over the Messenger module for reporting $scope related events.
*/

define([
  'bridge/Messenger'
], function (Messenger) {
  var Reporter,
      types;

  Reporter = function () {
    this._messenger = new Messenger(Messenger.contexts.INSPECTED_PAGE);
  };

  Reporter.prototype.reportScopeCreated = function ($scope) {
    this._messenger.send({
      type: types.SCOPE_CREATED,
      scopeId: $scope.$id
    });
  };

  Reporter.prototype.reportScopeDigest = function ($scope) {
    this._messenger.send({
      type: types.SCOPE_DIGEST,
      scopeId: $scope.$id
    });
  };

  Reporter.prototype.reportScopeDestroyed = function ($scope) {
    this._messenger.send({
      type: types.SCOPE_DESTROYED,
      scopeId: $scope.$id
    });
  };

  Reporter.types = types = {
    SCOPE_DIGEST: 0,
    SCOPE_CREATED: 1,
    SCOPE_DESTROYED: 2
  };

  return Reporter;

});
