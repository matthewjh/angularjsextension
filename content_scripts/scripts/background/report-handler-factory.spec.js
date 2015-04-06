define([
  'background/report-handler-factory-impl',
  'background/model'
  ],
  function (reportHandlerFactory, model) {
    'use strict';

    var reportHandlerFactoryImpl,
        modelMock;

    beforeEach(function () {
      reportHandlerFactoryImpl = reportHandlerFactory.get();
      modelMock = model.get();
    });

    describe('report handler factory', function () {
      it('should create a new object in model.tabs for the given tab id', function () {
        var tabId = 2;

        reportHandlerFactoryImpl(tabId);

        expect(modelMock.tabs[tabId]).toEqual({});
      });
    });
});
