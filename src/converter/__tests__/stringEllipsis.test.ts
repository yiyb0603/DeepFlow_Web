import stringEllipsis from '../stringEllipsis';

describe('stringEllipsis', () => {
  it('return correct value', () => {
    const testValue: string = 'TypeScript is Awesome!';

    expect(stringEllipsis(testValue, 10)).toBe('TypeScript...');
    expect(stringEllipsis(testValue, 25)).toBe(testValue);
  });
});