import chunkArray from '../chunkArray';

describe('chunkArray', () => {
  it('return correct value', () => {
    const dummyArray: number[] = [1, 2, 3, 4, 5, 6, 7];
    const dummyArrayResult: number[][] = [[1, 2, 3], [4, 5, 6], [7]];

    expect(chunkArray(dummyArray, 3)).toStrictEqual(dummyArrayResult);
  });
});