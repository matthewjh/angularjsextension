import {MutableScope, ImmutableScope, Scope} from 'src/model/scope';

export class ScopeFactory {
  create(underlyingScope: Object): Scope {
    return null;
  }
}

export class MutableScopeFactory extends ScopeFactory {
  create(underlyingScope: Object): Scope {
    return new MutableScope(underlyingScope);
  }
}

export class ImmutableScopeFactory extends ScopeFactory {
  create(underlyingScope: Object): Scope {
    return new ImmutableScope(underlyingScope);
  }
}
