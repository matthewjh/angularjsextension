'use strict';

define([
  'bridge/reporter-factory-impl',
  'bridge/messenger-factory',
  'sinon'
], function (reporterFactory, messengerFactory, sinon) {

  describe('reporterFactory', function () {
    var $scope,
        messenger,
        reporter;

    beforeEach(function () {
      messenger = {
        send: sinon.stub()
      };

      messengerFactory.returns(messenger);

      reporter = reporterFactory();

      $scope = {
        $id: 1
      };
    });

    it('should create a messenger with the INSPECTED_PAGE context', function () {
      expect(messengerFactory.withArgs(messengerFactory.contexts.INSPECTED_PAGE).callCount).toBe(1);
    });

    describe('.reportScopeDigest', function () {
      it('should call messenger.send with the correct payload', function () {
        reporter.reportScopeDigest($scope);

        expect(messenger.send
          .withArgs({
            type: reporterFactory.types.SCOPE_DIGEST,
            $scopeId: $scope.$id
          })
          .callCount).toBe(1);
      });
    });

    describe('.reportScopeCreated', function () {
      it('should call messenger.send with the correct payload', function () {
        reporter.reportScopeCreated($scope);

        expect(messenger.send
          .withArgs({
            type: reporterFactory.types.SCOPE_CREATED,
            $scopeId: $scope.$id
          })
          .callCount).toBe(1);
      });
    });
  });

})
;
