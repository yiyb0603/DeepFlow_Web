import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { calculateTime } from 'lib/TimeCounting';

const style = require('./UserItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface UserItemProps {
  idx: number;
  avatar: string;
  name: string;
  description: string;
  joinedAt: Date | string;
}

const UserItem = ({
  idx,
  avatar,
  name,
  description,
  joinedAt,
}: UserItemProps): JSX.Element => {
  return (
    <Link to={`/user/${idx}`} className={cx('UserItem')}>
      <div className={cx('UserItem-Left')}>
        <div className={cx('UserItem-Left-ContentsWrap')}>
          <img
            src={avatar}
            className={cx('UserItem-Left-ContentsWrap-Avatar')}
            alt='avatar'
          />

          <div className={cx('UserItem-Left-ContentsWrap-NameWrap')}>
            <div className={cx('UserItem-Left-ContentsWrap-NameWrap-Name')}>{name}</div>
            <div className={cx('UserItem-Left-ContentsWrap-NameWrap-Description')}>{description}</div>
          </div>
        </div>
      </div>

      <div className={cx('UserItem-JoinedAt')}>{calculateTime(joinedAt)}</div>
    </Link>
  );
};

export default UserItem;
