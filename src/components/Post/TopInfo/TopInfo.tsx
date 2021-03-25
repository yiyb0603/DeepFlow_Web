import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Link } from 'react-router-dom';
import { calculateTime } from 'lib/TimeCounting';
import { IUser } from 'types/user.types';

const style = require('./TopInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TopInfoProps {
  idx: number;
  createdAt: Date | string;
  user: IUser;
  requestDeletePost: (postIdx: number) => Promise<void>
}

const TopInfo = ({ idx, createdAt, user, requestDeletePost }: TopInfoProps): JSX.Element => {
  return (
    <div className={cx('TopInfo')}>
      <div className={cx('TopInfo-Left')}>
        <div className={cx('TopInfo-Left-CreatedAt')}>
          {calculateTime(createdAt)}
        </div>
        <Link
          to={`/user/${user.idx}`}
          className={cx('TopInfo-Left-UserName')}
        >
          {user.name}
        </Link>
      </div>

      <div className={cx('TopInfo-Right')}>
        <Link
          to={`/post-form/${idx}`}
          className={cx('TopInfo-Right-Modify')}
        >
          수정
        </Link>
        
        <div
          className={cx('TopInfo-Right-Delete')}
          onClick={() => requestDeletePost(idx)}
        >
          삭제
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
