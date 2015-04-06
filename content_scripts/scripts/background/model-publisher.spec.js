define([
    'background/model-publisher-impl',
    'background/model',
    'window'
  ],
  function (modelPublisher, model, window) {
    'use strict';

    var modelMock,
        modelPublisherImpl,
        windowMock;

    beforeEach(function () {
      modelMock = model.get();
      modelPublisherImpl = modelPublisher.get();
      windowMock = window.get();
    });

    describe('model publisher', function () {
      beforeEach(function () {
        modelPublisherImpl();
      });

      it('should set window.model to the model', function () {
        expect(windowMock.model).toBe(modelMock);
      });
    });
  });
