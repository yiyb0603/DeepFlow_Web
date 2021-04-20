import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Link } from 'react-router-dom';
import { AiOutlineLike } from 'react-icons/ai';
import { medals } from 'lib/models/menu/medals';

const style = require('./PopularUserItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PopularUserItemProps {
  idx: number;
  name: string;
  position: string;
  order: number;
  recommandCount: number;
}

const PopularUserItem = ({
  idx,
  name,
  position,
  order,
  recommandCount,
}: PopularUserItemProps): JSX.Element => {
  return (
    <div className={cx('PopularUserItem')}>
      <div className={cx('PopularUserItem-Left')}>
        <img
          src={medals[order]}
          className={cx('PopularUserItem-Left-Medal')}
          alt='medal'
        />

        <Link
          to={`/user/${idx}`}
          className={cx('PopularUserItem-Left-ContentsWrap')}
        >
          <div className={cx('PopularUserItem-Left-ContentsWrap-Name')}>{name}</div>
          <div>{position}</div>
        </Link>
      </div>

      <Link
        to={`/user-recommand/${idx}`}
        className={cx('PopularUserItem-Right')}
      >
        <AiOutlineLike />
        <div>{recommandCount}</div>
      </Link>
    </div>
  );
};

export default memo(PopularUserItem);