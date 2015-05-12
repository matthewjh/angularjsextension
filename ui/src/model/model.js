import {Injectable} from 'angular2/di';

import {Ticker} from 'src/model/ticker';

@Injectable()
export class Model {
  scopes: Object;
}

export class FakeModel extends Model {
  constructor(ticker: Ticker) {
    super();

    this.scopes = [];
    for (var i of [0, 1, 2, 3, 5]) {
      this.scopes.push(this._createFakeScope(i));
    }

    ticker.addTickHandler(() => {
      this._mutate();
    });
  }

  _mutate() {
    for (var scopeModel of this.scopes) {
      scopeModel.digestCount++;
    }
  }

  _createFakeScope(id: number): Object {
    return {
      id: id,
      digestCount: 0,
      isDestroyed: false
    }
  }
}

