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
      var scopeId,
          tabId;

      beforeEach(function () {
        scopeId = 5;
        tabId = 2;
      });

      it('should create a new object in model.tabs for the given tab id', function () {
        reportHandlerFactoryImpl(tabId);

        expect(modelMock.tabs[tabId]).toEqual({
          scopes: {}
        });
      });

      describe('a report handler', function () {
        var reportHandler,
            tabModel;

        beforeEach(function () {
          reportHandler = reportHandlerFactoryImpl(tabId);
          tabModel = modelMock.tabs[tabId];
        });

        describe('.handleScopeCreated', function () {
          it('should create an object in tabModel.scopes for the new scope', function () {
            reportHandler.handleScopeCreated({
              scopeId: scopeId
            });

            expect(tabModel.scopes[scopeId]).toEqual({
              digestCount: 0,
              id: scopeId,
              isDestroyed: false
            });
          });
        });

        describe('.handleScopeDigest', function () {
          beforeEach(function () {
            // create scope in model
            reportHandler.handleScopeCreated({
              scopeId: scopeId
            });
          });

          it('should increment the digest count on the scope\'s object in the model', function () {
            var originalDigestCount;

            originalDigestCount = tabModel.scopes[scopeId].digestCount;

            reportHandler.handleScopeDigest({
              scopeId: scopeId
            });

            expect(tabModel.scopes[scopeId].digestCount).toBe(originalDigestCount + 1);
          });
        });

        describe('.handleScopeDigest', function () {
          beforeEach(function () {
            // create scope in model
            reportHandler.handleScopeCreated({
              scopeId: scopeId
            });
          });

          it('should set destroyed to false for the scope\'s object in the model', function () {
            reportHandler.handleScopeDestroyed({
              scopeId: scopeId
            });

            expect(tabModel.scopes[scopeId].isDestroyed).toBe(true);
          });
        });
      });
    });
});
