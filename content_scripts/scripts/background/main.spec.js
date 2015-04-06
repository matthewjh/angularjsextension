define([
  'background/main-impl',
  'background/report-handler-factory',
  'background/publish-model',
  'bridge/Reporter',
  'sinon',
  'chrome-runtime'
  ],
  function (main, reportHandlerFactory, publishModel, Reporter, sinon, chromeRuntime) {
    'use strict';

    var chromeRuntimeMock,
        mainImpl,
        publishModelMock,
        reportHandlerFactoryMock,
        ReporterMock;

    beforeEach(function () {
      chromeRuntimeMock = chromeRuntime.get();
      mainImpl = main.get();
      publishModelMock = publishModel.get();
      reportHandlerFactoryMock = reportHandlerFactory.get();
      ReporterMock = Reporter.get();
    });

    describe('background page main function', function () {
      beforeEach(function () {
        mainImpl();
      });

      it('should add a chrome runtime connection listener', function () {
        expect(chromeRuntimeMock.onConnect.addListener.withArgs(sinon.match.func).callCount).toBe(1);
      });

      it('should publish the model', function () {
        expect(publishModelMock.callCount).toBe(1);
      });

      describe('when the chrome runtime connection listener is called with a port object', function () {
        var port,
            reportHandler,
            tabId;

        tabId = 5;

        beforeEach(function () {
          port = {
            onMessage: {
              addListener: sinon.stub()
            },
            onDisconnect: {
              addListener: sinon.stub()
            },
            sender: {
              tab: {
                id: tabId
              }
            }
          };

          reportHandler = {
            dispose: sinon.stub(),
            handleScopeCreated: sinon.stub(),
            handleScopeDestroyed: sinon.stub(),
            handleScopeDigest: sinon.stub()
          };

          reportHandlerFactoryMock.withArgs(tabId).returns(reportHandler);

          chromeRuntimeMock.onConnect.addListener.callArgWith(0, port);
        });

        it('should create a report handler for the tab', function () {
          expect(reportHandlerFactoryMock.withArgs(tabId).callCount).toBe(1);
        });

        it('should add a message listener onto the port', function () {
          expect(port.onMessage.addListener.withArgs(sinon.match.func).callCount).toBe(1);
        });

        it('should add a disconnect listener onto the port', function () {
          expect(port.onDisconnect.addListener.withArgs(sinon.match.func).callCount).toBe(1);
        });

        describe('when the disconnect listener is called', function () {
          beforeEach(function () {
            port.onDisconnect.addListener.callArg(0);
          });

          it('should dispose of the report handler', function () {
            expect(reportHandler.dispose.callCount).toBe(1);
          });
        });


        describe('when the message listener is called with a scope created report message', function () {
          var message;

          beforeEach(function () {
            message = {
              type: ReporterMock.types.SCOPE_CREATED
            };

            port.onMessage.addListener.callArgWith(0, message);
          });

          it('should pass the message to the correct report handler method', function () {
            expect(reportHandler.handleScopeCreated.withArgs(message).callCount).toBe(1);
          });
        });

        describe('when the message listener is called with a scope destroyed report message', function () {
          var message;

          beforeEach(function () {
            message = {
              type: ReporterMock.types.SCOPE_DESTROYED
            };

            port.onMessage.addListener.callArgWith(0, message);
          });

          it('should pass the message to the correct report handler method', function () {
            expect(reportHandler.handleScopeDestroyed.withArgs(message).callCount).toBe(1);
          });
        });

        describe('when the message listener is called with a scope digest report message', function () {
          var message;

          beforeEach(function () {
            message = {
              type: ReporterMock.types.SCOPE_DIGEST
            };

            port.onMessage.addListener.callArgWith(0, message);
          });

          it('should pass the message to the correct report handler method', function () {
            expect(reportHandler.handleScopeDigest.withArgs(message).callCount).toBe(1);
          });
        });
      });
    });
});
