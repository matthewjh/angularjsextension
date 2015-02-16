'use strict';

/*
* This module is always to be ran in the context of the inspected page.
*/

define([
  'bridge/Messenger'
  ],
  function (Messenger) {
    var start;

    start = function start () {
      var messenger = new Messenger(Messenger.prototype.contexts.INSPECTED_PAGE);

      messenger.send('Inspected Page -> Content Script: hi');

      messenger.onRecieve(function (payload) {
        window.alert(payload);
      });
    };

    return start;
  });
