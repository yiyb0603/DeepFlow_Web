import getMaxGeneration from 'util/getMaxGeneration';

describe('getMaxGeneration', () => {
  it('return correct number', () => {
    expect(typeof getMaxGeneration()).toBe('number');
  });

  it('return correct value', () => {
    const now: Date = new Date();
    const establishedAt: Date = new Date('2016-03-02');

    const result: number = (now.getFullYear() - establishedAt.getFullYear()) + 1;
    expect(getMaxGeneration()).toBe(result);
  });
});