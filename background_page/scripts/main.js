'use strict';

define([
    'bridge/messenger-factory',
    'bridge/reporter-factory',
    'config'
  ],
  function (messengerFactory, reporterFactory) {
    //var messenger;
    //
    //messenger = messengerFactory(messengerFactory.contexts.CONTENT_SCRIPT);
    //
    //messenger.onReceive(function (payload) {
    //  if (payload.type === reporterFactory.types.SCOPE_DIGEST) {
    //    console.log('$digest ', payload.$scopeId);
    //  }
    //});

    return 'hello';
  });

