import {Injectable} from 'angular2/di';
import {MutableScope, Scope} from 'src/model/scope';
import {Ticker} from 'src/model/ticker';

export class Model {
  scopes: Array<Scope>;
}

export class FakeModel extends Model {
  constructor(ticker: Ticker) {
    super();

    this.scopes = [];
    for (var i of [0, 1, 2, 3, 4]) {
      this._createFakeScope(i);
    }

    ticker.addTickHandler(() => {
      this._mutate();
    });
  }

  _mutate() {
    for (var scope of this.scopes) {
      if (!scope.isDestroyed) {
        if (Math.random() < 0.2) {
          scope.digest();
        }

        if (Math.random() < 0.005) {
          scope.destroy();
        }

        if (Math.random() < 0.01) {
          var childScope = this._createFakeScope(this.scopes.length);
          scope.addChild(childScope);
        }
      }
    }
  }

  _createFakeScope(id: number): MutableScope {
    var scope = new MutableScope({
      id: id,
      digestCount: 0,
      isDestroyed: false,
      nextSibling: null,
      childHead: null,
      childTail: null
    });

    this.scopes.push(scope);

    return scope;
  }
}
