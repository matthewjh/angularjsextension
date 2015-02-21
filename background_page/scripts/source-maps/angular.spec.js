'use strict';

define([
    'source-maps/angular-impl'
  ],
  function (angularSourceMap) {
    fdescribe('angularSourceMap', function () {
      var get;

      describe('angularSourceMap module', function () {
        it('should export a defined value', function () {
          expect(angularSourceMap).toBeDefined();
        });
      });

      describe('v1.3.13 mappings', function () {
        beforeEach(function () {
          get = angularSourceMap.getMapForVersion('1.3.13').get;
        });

        it('should map $RootScopeProvider/TTL to \'b\'', function () {
          expect(get('$RootScopeProvider/TTL')).toEqual('b');
        });
      });

    });
  });
