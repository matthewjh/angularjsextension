'use strict';

/*
* This module is always to be ran in the context of the inspected page.
*/

define([
  'window'
  ],
  function (window) {
    var start;

    start = function start () {
      window.alert(window.angular);
    };

    return start;
  });
