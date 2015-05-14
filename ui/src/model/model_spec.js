import {Model, FakeModel} from 'src/model/model';
import {MutableScope} from 'src/model/scope';
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

      for (var scope of model.scopes) {
        expect(scope.nextSibling).toBe(null);
        expect(scope.childHead).toBe(null);
        expect(scope.childTail).toBe(null);
        expect(scope.digestCount).toBe(0);
        expect(scope.isDestroyed).toBe(false);
      }
    });
  });
};
