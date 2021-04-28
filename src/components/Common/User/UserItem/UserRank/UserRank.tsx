import { CSSProperties, useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { rankToBackgroundColor } from 'converter/rankToStyle';

const style = require('./UserRank.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface UserRankProps {
  rankIndex: number;
}

const UserRank = ({
  rankIndex,
}: UserRankProps) => {
  const userRankStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: rankToBackgroundColor(rankIndex),
    };
  }, [rankIndex]);

  return (
    <div className={cx('UserRank')} style={userRankStyle}>
      <div className={cx('UserRank-RankIndex')}>{rankIndex}</div>
    </div>
  );
};

export default UserRank;
