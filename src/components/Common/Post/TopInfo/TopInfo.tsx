import { useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Link } from 'react-router-dom';
import calculateTime from 'lib/calculateTime';
import { IToken, IUser } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';

const style = require('./TopInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TopInfoProps {
  idx: number;
  createdAt: Date | string;
  user: IUser;
  modifyLink: string;
  requestDeleteQuestion: (postIdx: number) => Promise<void>;
}

const TopInfo = ({
  idx,
  createdAt,
  user,
  modifyLink,
  requestDeleteQuestion,
}: TopInfoProps): JSX.Element => {
  const myInfo: IToken = useMemo(() => getMyInfo(), []);

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

      {
        myInfo && myInfo.idx === user.idx &&
        <div className={cx('TopInfo-Right')}>
          <Link
            to={modifyLink}
            className={cx('TopInfo-Right-Modify')}
          >
            수정
          </Link>
          
          <div
            className={cx('TopInfo-Right-Delete')}
            onClick={() => requestDeleteQuestion(idx)}
          >
            삭제
          </div>
        </div>
      }
    </div>
  );
};

export default TopInfo;
