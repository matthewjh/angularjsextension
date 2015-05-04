import {Injectable} from 'angular2/di';

import {Ticker} from 'src/model/ticker';

export class ScopeModel {
  id: string;
  digestCount: number;
  isDestroyed: boolean;

  constructor(id: string, digestCount: number = 0, isDestroyed: boolean = false) {
    this.id = id;
    this.digestCount = digestCount;
    this.isDestroyed = isDestroyed;
  }
}

@Injectable()
export class Model {
  scopes: Map<string, ScopeModel>;
}

export class FakeModel extends Model {
  constructor(ticker: Ticker) {
    super();

    this.scopes = new Map();
    this.scopes.set('0', new ScopeModel('0'));
    this.scopes.set('1', new ScopeModel('1'));
    this.scopes.set('2', new ScopeModel('2'));
    this.scopes.set('3', new ScopeModel('3'));
    this.scopes.set('4', new ScopeModel('4'));

    ticker.addTickHandler(() => {
      this._mutate();
    });
  }

  _mutate() {
    for (var scopeModel of this.scopes) {
      scopeModel.digestCount++;
    }
  }
}

