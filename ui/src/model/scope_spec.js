import {Scope} from 'src/model/scope';

export function main() {
  describe('Scope', () => {
    var nextId: number,
        scope: Scope,
        underlyingScope: Object;

    beforeEach(() => {
      nextId = 0;
      underlyingScope = {
        id: nextId++,
        nextSibling: {id: nextId++},
        childHead: {id: nextId++},
        childTail: {id: nextId++},
        isDestroyed: false,
        digestCount: 0
      };

      scope = new Scope(underlyingScope);
    });

    it('should wrap the underlying scope object passed to the constructor', () => {
      expect(scope.id).toBe(underlyingScope.id);
      expect(scope.nextSibling.id).toBe(underlyingScope.nextSibling.id);
      expect(scope.childHead.id).toBe(underlyingScope.childHead.id);
      expect(scope.childTail.id).toBe(underlyingScope.childTail.id);
    });

    it('should reflect changes to the underlying scope object\'s properties', () => {
      underlyingScope.id = nextId++;
      underlyingScope.nextSibling.id = nextId++;
      underlyingScope.childHead.id = nextId++;
      underlyingScope.childTail.id = nextId++;
      underlyingScope.isDestroyed = true;
      underlyingScope.digestCount = 1;

      expect(scope.id).toBe(underlyingScope.id);
      expect(scope.nextSibling.id).toBe(underlyingScope.nextSibling.id);
      expect(scope.childHead.id).toBe(underlyingScope.childHead.id);
      expect(scope.childTail.id).toBe(underlyingScope.childTail.id);
    });
  });
};
