import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
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
        <div className={cx('TopInfo-Left-UserName')}>{user.name}</div>
      </div>

      <div className={cx('TopInfo-Right')}>
        <div className={cx('TopInfo-Right-Modify')}>수정</div>
        
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
