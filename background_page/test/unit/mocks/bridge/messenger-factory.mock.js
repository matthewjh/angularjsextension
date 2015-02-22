'use strict';

define([
  'sinon'
  ],
  function (sinon) {
    var messengerFactory;

    messengerFactory = sinon.stub();

    messengerFactory.contexts = {
      INSPECTED_PAGE: 'inspected-page',
      CONTENT_SCRIPT: 'content-script'
    };

    return messengerFactory;
  });
