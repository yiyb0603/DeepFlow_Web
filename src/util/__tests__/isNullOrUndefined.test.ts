import isNullOrUndefined from '../isNullOrUndefined';

describe('isNullOrUndefined', () => {
  it('return correct value', () => {
    expect(isNullOrUndefined(null)).toBe(true);
    expect(isNullOrUndefined(undefined)).toBe(true);
    expect(isNullOrUndefined('test')).toBe(false);
  });
});