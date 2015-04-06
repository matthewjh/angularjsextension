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
    });
});
