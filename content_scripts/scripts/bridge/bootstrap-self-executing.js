/*
* Entry point for script injected into inspected page.
*/

define([
  'bridge/bootstrap'
  ],
  function (bootstrap) {
    'use strict';

    return bootstrap();
  });

