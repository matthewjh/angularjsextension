import {Ticker, IntervalTicker} from 'src/model/ticker';


export function main() {
  describe('IntervalTicker', () => {
    var ticker: Ticker,
        intervalMs: number;

    beforeEach(() => {
      sinon.spy(window, 'setInterval');

      intervalMs = 50;
      ticker = new IntervalTicker(intervalMs);
    });

    afterEach(() => {
      window.setInterval.restore();
    });

    it('should set an interval', () => {
      expect(window.setInterval.withArgs(sinon.match.func, intervalMs).calledOnce).toBe(true);
    });

    it('should call tick handlers when the setInterval callback is fired', () => {
      var handler1 = sinon.stub(),
          handler2 = sinon.stub(),
          handler3 = sinon.stub();

      ticker.addTickHandler(handler1);
      ticker.addTickHandler(handler2);
      ticker.addTickHandler(handler3);

      window.setInterval.callArg(0);

      expect(handler1.calledOnce).toBe(true);
      expect(handler2.calledOnce).toBe(true);
      expect(handler3.calledOnce).toBe(true);
    });

  });
};
