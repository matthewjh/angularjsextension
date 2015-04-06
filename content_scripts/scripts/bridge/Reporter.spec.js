'use strict';

define([
  'bridge/Reporter-impl',
  'bridge/Messenger',
  'sinon'
], function (Reporter, Messenger, sinon) {
  var ReporterImpl,
      MessengerMock;

  beforeEach(function () {
    ReporterImpl = Reporter.get();
    MessengerMock = Messenger.get();
  });

  describe('Reporter', function () {
    var $scope,
        messenger,
        reporter;

    beforeEach(function () {
      messenger = {
        send: sinon.stub()
      };

      MessengerMock.returns(messenger);

      reporter = new ReporterImpl();

      $scope = {
        $id: 1
      };
    });

    it('should create a messenger with the INSPECTED_PAGE context', function () {
      expect(MessengerMock.withArgs(MessengerMock.contexts.INSPECTED_PAGE).callCount).toBe(1);
    });

    describe('.reportScopeDigest', function () {
      it('should call messenger.send with the correct payload', function () {
        reporter.reportScopeDigest($scope);

        expect(messenger.send
          .withArgs({
            type: ReporterImpl.types.SCOPE_DIGEST,
            scopeId: $scope.$id
          })
          .callCount).toBe(1);
      });
    });

    describe('.reportScopeCreated', function () {
      it('should call messenger.send with the correct payload', function () {
        reporter.reportScopeCreated($scope);

        expect(messenger.send
          .withArgs({
            type: ReporterImpl.types.SCOPE_CREATED,
            scopeId: $scope.$id
          })
          .callCount).toBe(1);
      });
    });

    describe('.reportScopeDestroyed', function () {
      it('should call messenger.send with the correct payload', function () {
        reporter.reportScopeDestroyed($scope);

        expect(messenger.send
          .withArgs({
            type: ReporterImpl.types.SCOPE_DESTROYED,
            scopeId: $scope.$id
          })
          .callCount).toBe(1);
      });
    });
  });

})
;
