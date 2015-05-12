import {Model, FakeModel} from 'src/model/model';

import {Ticker} from 'src/model/ticker';

export function main() {
  describe('FakeModel', () => {
    var model: Model,
        ticker: Ticker;

    class MockTicker extends Ticker {
      constructor() {
        super();
        this.addTickHandler = sinon.stub();
      }
    }

    beforeEach(() => {
      ticker = new MockTicker();
      model = new FakeModel(ticker);
    });

    it('should have 5 scopes with default properties', () => {
      expect(model.scopes.length).toBe(5);

      for (var scopeModel of model.scopes) {
        expect(scopeModel.digestCount).toBe(0);
        expect(scopeModel.isDestroyed).toBe(false);
      }
    });

    it('should mutate the model when the ticker ticks', () => {
      var scopeDigestCountBeforeTick = model.scopes[0].digestCount;

      // tick
      ticker.addTickHandler.callArg(0);

      expect(scopeDigestCountBeforeTick).not.toEqual(model.scopes[0].digestCount);
    });

  });
};
