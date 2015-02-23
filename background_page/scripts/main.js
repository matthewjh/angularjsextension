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
    //  } else if (payload.type === reporterFactory.types.SCOPE_CREATED) {
    //    console.log('scope created ', payload.$scopeId);
    //  } else if (payload.type === reporterFactory.types.SCOPE_DESTROYED) {
    //    console.log('scope destroyed ', payload.$scopeId);
    //  }
    //});
  });

