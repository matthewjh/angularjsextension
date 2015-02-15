'use strict';

/*
* This module is always to be ran in the context of the inspected page.
*/

define([
  'bridge/messenger'
  ],
  function (messenger) {
    var start;

    start = function start () {
      messenger.sendMessage('hello, world');
    };

    return start;
  });
