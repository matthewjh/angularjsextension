import main from 'impl~main.js';
import dep1 from 'dep1.js';

var dep1Mock,
    mainImpl;

beforeEach(() => {
  dep1Mock = dep1.get();
  mainImpl = main.get();
});

describe('main', () => {
  it('should should export dep1()', () => {
    expect(mainImpl).toBe(dep1Mock());
  });
});

