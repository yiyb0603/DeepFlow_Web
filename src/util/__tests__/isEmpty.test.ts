import isEmpty from '../isEmpty';

describe('isEmpty', () => {
  it('return correct value', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('test')).toBe(false);
  });
});