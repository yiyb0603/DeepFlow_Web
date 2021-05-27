import getGithubAddress from '../getGithubAddress';

describe('getGithubAddress', () => {
  it('return correct string', () => {
    expect(typeof getGithubAddress('yiyb0603')).toBe('string');
  });

  it('return github address', () => {
    const result: string = 'https://github.com/yiyb0603';
    expect(getGithubAddress('yiyb0603')).toBe(result);
  });
});