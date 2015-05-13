import {Injectable, Inject, OpaqueToken} from 'angular2/di';

export const TICK_INTERVAL_MS: OpaqueToken = new OpaqueToken('Ticker.tickIntervalMs');

@Injectable()
export class Ticker {
  fns: Array<Function>;

  constructor() {
    this.fns = [];
  }

  addTickHandler (fn: Function) {
    this.fns.push(fn);
  }

  _onTick() {
    for (var fn of this.fns) {
      fn();
    }
  }
}

export class IntervalTicker extends Ticker {
  constructor(@Inject(TICK_INTERVAL_MS) tickIntervalMs: number) {
    super();
    window.setInterval(() => {
      this._onTick();
    }, tickIntervalMs);
  }
}
