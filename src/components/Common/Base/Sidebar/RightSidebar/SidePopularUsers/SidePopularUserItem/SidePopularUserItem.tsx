import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Link } from 'react-router-dom';
import { AiOutlineLike } from 'react-icons/ai';

const style = require('./SidePopularUserItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SidePopularUserItemProps {
  idx: number;
  avatar: string;
  name: string;
  position: string;
  recommandCount: number;
}

const SidePopularUserItem = ({
  idx,
  avatar,
  name,
  position,
  recommandCount,
}: SidePopularUserItemProps): JSX.Element => {
  return (
    <div className={cx('SidePopularUserItem')}>
      <div className={cx('SidePopularUserItem-Left')}>
        <img
          src={avatar}
          className={cx('SidePopularUserItem-Left-Medal')}
          alt='avatar'
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