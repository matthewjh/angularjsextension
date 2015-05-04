import {Injectable} from 'angular2/di';

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
  constructor() {
    super();
    window.setInterval(() => {
      this._onTick();
    }, 2000);
  }
}
