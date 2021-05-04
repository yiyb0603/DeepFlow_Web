import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Link } from 'react-router-dom';
import { calculateTime } from 'lib/TimeCounting';

const style = require('./LikeItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface LikeItemProps {
  userIdx: number;
  avatar: string;
  name: string;
  description: string;
  pressedAt: Date;
}

const LikeItem = ({
  userIdx,
  avatar,
  name,
  description,
  pressedAt,
}: LikeItemProps): JSX.Element => {
  return (
    <Link to={`/user/${userIdx}`} className={cx('LikeItem')}>
      <div className={cx('LikeItem-Left')}>
        <img
          src={avatar}
          className={cx('LikeItem-Left-Profile')}
          alt='avatar'
        />

        <div className={cx('LikeItem-Left-ContentsWrap')}>
          <div className={cx('LikeItem-Left-ContentsWrap-Name')}>{name}</div>
          <div className={cx('LikeItem-Left-ContentsWrap-Description')}>{description}</div>
        </div>
      </div>

      <div>{calculateTime(pressedAt)}</div>
    </Link>
  );
};

export default LikeItem;
