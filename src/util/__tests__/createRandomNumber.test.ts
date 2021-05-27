import createRandomNumber from 'util/createRandomNumber';

describe('createRandomNumber', () => {
  it('return correct value', () => {
    expect(typeof createRandomNumber()).toBe('number');
  });
});