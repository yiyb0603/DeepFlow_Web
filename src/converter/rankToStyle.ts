import { ERank } from 'lib/enum/rank';
import { palette } from 'styles/Palette/Palette';

export interface IRank {
  rank: string;
  rankName: string;
  color: string;
}

export const rankToStyle = (rank: ERank): IRank => {
  switch (rank) {
    case ERank.BRONZE:
      return {
        rank: 'B',
        rankName: '브론즈',
        color: palette.bronze,
      };

    case ERank.SILVER:
      return {
        rank: 'S',
        rankName: '실버',
        color: palette.silver,
      };

    case ERank.GOLD:
      return {
        rank: 'G',
        rankName: '골드',
        color: palette.yellow,
      };

    case ERank.PLATINUM:
      return {
        rank: 'P',
        rankName: '플래티넘',
        color: palette.platinum,
      };

    case ERank.DIAMOND:
      return {
        rank: 'D',
        rankName: '다이아몬드',
        color: palette.diamond,
      };

    default:
      return {
        rank: 'M',
        rankName: '마스터',
        color: palette.master,
      };
  }
}