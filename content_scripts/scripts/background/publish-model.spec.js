define([
    'background/publish-model-impl',
    'background/model',
    'window'
  ],
  function (publishModel, model, window) {
    'use strict';

    var modelMock,
        publishModelImpl,
        windowMock;

    beforeEach(function () {
      modelMock = model.get();
      publishModelImpl = publishModel.get();
      windowMock = window.get();
    });

    describe('model publisher', function () {
      beforeEach(function () {
        publishModelImpl();
      });

      it('should set window.model to the model', function () {
        expect(windowMock.model).toBe(modelMock);
      });
    });
  });
