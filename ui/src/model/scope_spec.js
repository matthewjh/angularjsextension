import {Scope, MutableScope} from 'src/model/scope';

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

  describe('MutableScope', () => {
    var mutableScope: MutableScope;

    beforeEach(() => {
      var underlyingScope = {
        id: 0,
        nextSibling: null,
        childHead: null,
        childTail: null,
        isDestroyed: false,
        digestCount: 0
      };

      mutableScope = new MutableScope(underlyingScope);
    });

    it('should set isDestroyed to true when .destroy is called', () => {
      mutableScope.destroy();

      expect(mutableScope.isDestroyed).toBe(true);
    });

    it('should increment digestCount when .digest is called', () => {
      mutableScope.digest();

      expect(mutableScope.digestCount).toBe(1);
    });

    it('should add a child scope when .addChild is called', () => {
      var childUnderlyingScope = {
        id: 1,
        nextSibling: null,
        childHead: null,
        childTail: null,
        isDestroyed: false,
        digestCount: 0
      };

      var childUnderlyingScope2 = {
        id: 2,
        nextSibling: null,
        childHead: null,
        childTail: null,
        isDestroyed: false,
        digestCount: 0
      };

      var childMutableScope = new MutableScope(childUnderlyingScope),
          childMutableScope2 = new MutableScope(childUnderlyingScope2);

      mutableScope.addChild(childMutableScope);

      expect(mutableScope.childHead).toBe(childMutableScope);
      expect(mutableScope.childTail).toBe(childMutableScope);

      mutableScope.addChild(childMutableScope2);

      expect(mutableScope.childHead).toBe(childMutableScope);
      expect(mutableScope.childHead.nextSibling).toBe(childMutableScope2);
      expect(mutableScope.childTail).toBe(childMutableScope2);
    });
  });
};
