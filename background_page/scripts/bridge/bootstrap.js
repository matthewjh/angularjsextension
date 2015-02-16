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
      messenger.registerContextAsInspectedPage();
      messenger.send('Inspected Page -> Content Script: hi');

      messenger.onRecieve(function (payload) {
        window.alert(payload);
      });
    };

    return start;
  });
