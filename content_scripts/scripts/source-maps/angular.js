'use strict';

define([],
  function () {
    var map;

    map = {};

    map['1.3.13'] = {
      '$RootScopeProvider/TTL': 'b'
    };

    return {
      getMapForVersion: function (version) {
        return {
          get: function (key) {
            return map[version][key];
          }
        };
      }
    };
  });
