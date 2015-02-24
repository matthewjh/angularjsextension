'use strict';

define([
  'bridge/bootstrap-self-executing-impl',
  'bridge/bootstrap'
  ],
  function (bootstrapSelfExecuting, bootstrap) {

    describe('during bootstrapSelfExecuting module loading', function () {

      it('should call bootstrap', function () {
        expect(bootstrap.callCount).toBe(1);
      });

    });
});
