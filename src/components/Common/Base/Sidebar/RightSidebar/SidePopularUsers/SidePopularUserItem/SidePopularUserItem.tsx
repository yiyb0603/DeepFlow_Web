import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Link } from 'react-router-dom';
import { AiOutlineLike } from 'react-icons/ai';
import { medals } from 'lib/models/menu/medals';

const style = require('./SidePopularUserItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SidePopularUserItemProps {
  idx: number;
  name: string;
  position: string;
  order: number;
  recommandCount: number;
}

const SidePopularUserItem = ({
  idx,
  name,
  position,
  order,
  recommandCount,
}: SidePopularUserItemProps): JSX.Element => {
  return (
    <div className={cx('SidePopularUserItem')}>
      <div className={cx('SidePopularUserItem-Left')}>
        <img
          src={medals[order]}
          className={cx('SidePopularUserItem-Left-Medal')}
          alt='medal'
        />

        <Link
          to={`/user/${idx}`}
          className={cx('SidePopularUserItem-Left-ContentsWrap')}
        >
          <div className={cx('SidePopularUserItem-Left-ContentsWrap-Name')}>{name}</div>
          <div className={cx('SidePopularUserItem-Left-ContentsWrap-Position')}>{position}</div>
        </Link>
      </div>

      <Link
        to={`/user-recommand/${idx}`}
        className={cx('SidePopularUserItem-Right')}
      >
        <AiOutlineLike />
        <div>{recommandCount}</div>
      </Link>
    </div>
  );
};

export default memo(SidePopularUserItem);