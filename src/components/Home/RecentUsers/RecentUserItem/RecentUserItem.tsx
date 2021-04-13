import { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { History } from 'history';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineLike } from 'react-icons/ai';

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
  const history: History = useHistory();
  const handlePushToRecommand = useCallback((): void => {
    history.push(`/user-recommand/${idx}`)
  }, [history, idx]);

  return (
    <div className={cx('RecentUserItem')}>
      <div className={cx('RecentUserItem-Left')}>
        <img
          src={avatar}
          className={cx('RecentUserItem-Left-Avatar')}
          alt='avatar'
        />

        <Link to={`/user/${idx}`} className={cx('RecentUserItem-Left-Info')}>
          <div className={cx('RecentUserItem-Left-Info-Name')}>{name}</div>
          <div className={cx('RecentUserItem-Left-Info-Position')}>{position}</div>
        </Link>
      </div>

      <AiOutlineLike
        className={cx('RecentUserItem-Recommand')}
        onClick={handlePushToRecommand}
      />
    </div>
  );
};

export default RecentUserItem;
