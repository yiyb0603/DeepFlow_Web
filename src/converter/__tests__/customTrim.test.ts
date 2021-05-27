import customTrim from '../customTrim';

describe('customTrim', () => {
  it('return correct value', () => {
    expect(customTrim(' test ')).toBe('test');
    expect(customTrim(' t e s t ')).toBe('test');
  });
});