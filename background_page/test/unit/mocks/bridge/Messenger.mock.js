'use strict';

define([
  'sinon'
  ],
  function (sinon) {
    var MessengerMock;

    MessengerMock = function () {
      this.send = sinon.stub();
      this.onRecieve = sinon.stub();
    };

    MessengerMock.contexts = {
      INSPECTED_PAGE: 'inspected-page',
      CONTENT_SCRIPT: 'content-script'
    };

    return MessengerMock;
  });