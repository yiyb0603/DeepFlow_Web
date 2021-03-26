import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { calculateTime } from 'lib/TimeCounting';
import { IUser } from 'types/user.types';

const style = require('./CommentItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentItemProps {
  idx: number;
  contents: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  user: IUser;
}

const CommentItem = ({
  idx,
  contents,
  createdAt,
  updatedAt,
  user,
}: CommentItemProps) => {
  return (
    <div className={cx('CommentItem')}>
      <div className={cx('CommentItem-TopInfo')}>
        <div className={cx('CommentItem-TopInfo-Left')}>
          <img
            src={user.avatar}
            className={cx('CommentItem-TopInfo-Left-Profile')}
            alt='avatar'
          />

          <div className={cx('CommentItem-TopInfo-Left-UserTime')}>
            <div className={cx('CommentItem-TopInfo-Left-UserTime-User')}>{user.name}</div>
            <div className={cx('CommentItem-TopInfo-Left-UserTime-Time')}>{calculateTime(createdAt)}</div>
          </div>
        </div>

        <div className={cx('CommentItem-TopInfo-Right')}>
          <span>수정</span>
          <span className={cx('CommentItem-TopInfo-Right-Delete')}>삭제</span>
        </div>
      </div>

      <div className={cx('CommentItem-Contents')}>{contents}</div>
    </div>
  );
};

export default CommentItem;
