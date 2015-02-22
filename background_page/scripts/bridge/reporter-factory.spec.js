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
        $scope = {};
      });

      it('should call messenger.send with the correct payload', function () {
        reporter.reportScopeDigest($scope);

        expect(messenger.send
          .withArgs({
            $scope: $scope,
            type: reporterFactory.reportTypes.REPORT_SCOPE_DIGEST
          })
          .callCount).toBe(1);
      });
    });
  });

})
;
