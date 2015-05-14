export class Scope {
  _underlyingScope: Object;

  constructor(underlyingScope: Object) {
    this._underlyingScope = underlyingScope;
  }

  get id(): number {
    return this._underlyingScope.id;
  }

  get nextSibling(): Object {
    return this._underlyingScope.nextSibling;
  }

  get childHead(): Object {
    return this._underlyingScope.childHead;
  }

  get childTail(): Object {
    return this._underlyingScope.childTail;
  }

  get isDestroyed(): boolean {
    return this._underlyingScope.isDestroyed;
  }

  get digestCount(): number {
    return this._underlyingScope.digestCount;
  }
}

/**
 * A MutableScope can be changed by our code, e.g. to add a new child.
 */
export class MutableScope extends Scope {
  destroy() {
    this._underlyingScope.isDestroyed = true;
  }

  digest() {
    this._underlyingScope.digestCount++;
  }

  addChild(scope: Scope) {
    if (!this._underlyingScope.childHead) {
      this._underlyingScope.childHead = scope;
      this._underlyingScope.childTail = scope;
    } else {
      this._underlyingScope.childTail._underlyingScope.nextSibling = scope;
      this._underlyingScope.childTail = scope;
    }
  }
}

/**
 * An ImmutableScope cannot be changed by our code -- any and all changes reflect changes in the underlying
 * scope object.
 */
export class ImmutableScope extends Scope {}
