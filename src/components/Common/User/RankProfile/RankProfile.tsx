import { useMemo, memo, CSSProperties } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Tooltip } from 'antd';
import { ERank } from 'lib/enum/rank';
import { IRank, rankToProfileStyle } from 'converter/rankToStyle';
import { palette } from 'styles/Palette/Palette';

const style = require('./RankProfile.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface RankProfileProps {
  avatar: string;
  rank: ERank;
}

const RankProfile = ({
  avatar,
  rank,
}: RankProfileProps): JSX.Element => {
  const rankInfo: IRank = useMemo(() => rankToProfileStyle(rank), [rank]);
  const rankStyle: CSSProperties = {
    backgroundColor: rankInfo.color,
  };

  return (
    <div className={cx('RankProfile')}>
      <img
        src={avatar}
        className={cx('RankProfile-Profile')}
        alt='avatar'
      />

      <Tooltip
        title={rankInfo.rankName}
        placement='bottom'
        color={palette.main}
      >
        <div
          className={cx('RankProfile-Rank')}
          style={rankStyle}
        >
          <div>{rankInfo.rank}</div>
        </div>
      </Tooltip>
    </div>
  );
};

export default memo(RankProfile);
