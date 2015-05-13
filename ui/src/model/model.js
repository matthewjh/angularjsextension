import {Injectable} from 'angular2/di';

import {Ticker} from 'src/model/ticker';

export class Model {
  scopes: Array<Object>;
}

export class FakeModel extends Model {
  constructor(ticker: Ticker) {
    super();

    this.scopes = [];
    for (var i of [0, 1, 2, 3, 4]) {
      this.scopes.push(this._createFakeScope(i));
    }

    ticker.addTickHandler(() => {
      this._mutate();
    });
  }

  _mutate() {
    for (var scope of this.scopes) {
      if (!scope.isDestroyed) {
        if (Math.random() < 0.2) {
          scope.digestCount++;
        }

        if (Math.random() < 0.005) {
          scope.isDestroyed = true;
        }

        if (Math.random() < 0.01) {
          var childScope = this._createFakeScope(this.scopes.length);
          this.scopes.push(childScope);
          attachScopeAsNextChild(scope, childScope);
        }
      }
    }
  }

  _createFakeScope(id: number): Object {
    return {
      id: id,
      digestCount: 0,
      isDestroyed: false,
      nextSibling: null,
      childHead: null,
      childTail: null
    }
  }
}

function attachScopeAsNextChild(parent: Object, child: Object) {
  if (!parent.childHead) {
    parent.childHead = child;
    parent.childTail = child;
  } else {
    parent.childTail.nextSibling = child;
    parent.childTail = child;
  }
}

