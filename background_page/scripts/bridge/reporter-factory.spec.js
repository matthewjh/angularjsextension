'use strict';

define([
  'bridge/reporter-factory-impl',
  'bridge/messenger-factory',
  'sinon'
], function (reporterFactory, messengerFactory, sinon) {

  describe('reporterFactory', function () {
    var messenger,
        reporter;

    beforeEach(function () {
      messenger = {
        send: sinon.stub()
      };

      messengerFactory.returns(messenger);

      reporter = reporterFactory();
    });

    it('should create a messenger with the INSPECTED_PAGE context', function () {
      expect(messengerFactory.withArgs(messengerFactory.contexts.INSPECTED_PAGE).callCount).toBe(1);
    });

    describe('.reportScopeDigest', function () {
      var $scope;

      beforeEach(function () {
        $scope = {
          $id: 1
        };
      });

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
  });

})
;
