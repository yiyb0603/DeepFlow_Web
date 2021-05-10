import { useCallback, MouseEvent, memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineLike } from 'react-icons/ai';
import { historySingleton } from 'lib/singleton/history';

const style = require('./RecentUserItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface RecentUserItemProps {
  idx: number;
  avatar: string;
  name: string;
  position: string;
}

const RecentUserItem = ({
  idx,
  avatar,
  name,
  position,
}: RecentUserItemProps): JSX.Element => {
  const handlePushToRecommand = useCallback((e: MouseEvent<SVGElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    historySingleton.push(`/user-recommand/${idx}`)
  }, [idx]);

  return (
    <Link
      to={`/user/${idx}`}
      className={cx('RecentUserItem')}
    >
      <div className={cx('RecentUserItem-Left')}>
        <img
          src={avatar}
          className={cx('RecentUserItem-Left-Avatar')}
          alt={avatar}
        />

        <div className={cx('RecentUserItem-Left-Info')}>
          <div className={cx('RecentUserItem-Left-Info-Name')}>{name}</div>
          <div className={cx('RecentUserItem-Left-Info-Position')}>{position}</div>
        </div>
      </div>

      <AiOutlineLike
        className={cx('RecentUserItem-Recommand')}
        onClick={handlePushToRecommand}
      />
    </Link>
  );
};

export default memo(RecentUserItem);
