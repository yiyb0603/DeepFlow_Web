import createRandomColor from '../createRandomColor';

describe('createRandomColor', () => {
  it('return correct hexadecimal', () => {
    expect(typeof createRandomColor()).toBe('string');
    expect(createRandomColor().charAt(0)).toBe('#');
  });
});