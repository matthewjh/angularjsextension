'use strict';

define([
  'bridge/bootstrap-self-executing-impl',
  'bridge/bootstrap'
  ],
  function (bootstrapSelfExecuting, bootstrap) {
    var bootstrapMock;

    beforeEach(function () {
      bootstrapSelfExecuting.get();
      bootstrapMock = bootstrap.get();
    });

    describe('during bootstrapSelfExecuting module loading', function () {

      it('should call bootstrap', function () {
        expect(bootstrapMock.callCount).toBe(1);
      });

    });
});
