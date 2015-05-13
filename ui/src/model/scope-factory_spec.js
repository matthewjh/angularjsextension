import {ScopeFactory, MutableScopeFactory, ImmutableScopeFactory} from 'src/model/scope-factory';
import {MutableScope, ImmutableScope} from 'src/model/scope';

export function main() {
  describe('MutableScopeFactory', () => {
    var mutableScopeFactory: ScopeFactory;

    beforeEach(() => {
      mutableScopeFactory = new MutableScopeFactory();
    });

    it('should create mutable scopes through .create', () => {
      var scope = mutableScopeFactory.create({});
      console.log(scope.constructor);
      expect(scope).toBe(jasmine.any(MutableScope));
    });
  });

    describe('ImmutableScopeFactory', () => {
    var immutableScopeFactory: ScopeFactory;

    beforeEach(() => {
      immutableScopeFactory = new ImmutableScopeFactory();
    });

    it('should create immutable scopes through .create', () => {
      var scope = immutableScopeFactory.create({});
      expect(scope).toBe(jasmine.any(ImmutableScope));
    });
  });
};
