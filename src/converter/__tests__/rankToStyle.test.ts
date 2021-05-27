import { ERank } from 'lib/enum/rank';
import palette from 'styles/palette';
import { IRank, rankToBackgroundColor, rankToProfileStyle } from '../rankToStyle';

describe('rankToStyle', () => {
  it('correct background color to rank', () => {
    expect(rankToBackgroundColor(1)).toBe(palette.yellow);
    expect(rankToBackgroundColor(3)).toBe(palette.bronze);
    expect(typeof rankToBackgroundColor(4)).toBe('string');
  });

  it('correct rank style with profile', () => {
    const testResult1: IRank = {
      rank: 'G',
      rankName: '골드',
      color: palette.yellow,
    };

    const testResult2: IRank = {
      rank: 'D',
      rankName: '다이아몬드',
      color: palette.diamond,
    };

    expect(rankToProfileStyle(ERank.GOLD)).toStrictEqual(testResult1);
    expect(rankToProfileStyle(ERank.DIAMOND)).toStrictEqual(testResult2);
  });
});