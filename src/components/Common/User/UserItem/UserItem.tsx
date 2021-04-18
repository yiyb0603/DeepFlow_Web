import { MouseEvent, useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { VscChromeClose } from 'react-icons/vsc';
import { calculateTime } from 'lib/TimeCounting';
import { getMyInfo } from 'util/getMyInfo';
import { IToken } from 'types/user.types';

const style = require('./UserItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface UserItemProps {
  idx: number;
  avatar: string;
  name: string;
  text: string;
  position: string;
  date: Date | string;
  canDelete?: boolean;
  onDelete?: (e: MouseEvent<SVGElement>) => Promise<void>;
}

const UserItem = ({
  idx,
  avatar,
  name,
  text,
  position,
  date,
  canDelete,
  onDelete,
}: UserItemProps): JSX.Element => {
  const myInfo: IToken = useMemo(() => getMyInfo(), []);

  return (
    <Link to={`/user/${idx}`} className={cx('UserItem')}>
      {
        canDelete && (myInfo && myInfo.idx === idx) &&
        <VscChromeClose
          className={cx('UserItem-Close')}
          onClick={onDelete}
        />
      }
      <div className={cx('UserItem-Left')}>
        <div className={cx('UserItem-Left-ContentsWrap')}>
          <img
            src={avatar}
            className={cx('UserItem-Left-ContentsWrap-Avatar')}
            alt='avatar'
          />

          <div className={cx('UserItem-Left-ContentsWrap-NameWrap')}>
            <div className={cx('UserItem-Left-ContentsWrap-NameWrap-Wrap')}>
              <Link
                to={`/user/${idx}`}
                className={cx('UserItem-Left-ContentsWrap-NameWrap-Wrap-Name')}
              >
                {name}
              </Link>

              <div className={cx('UserItem-Left-ContentsWrap-NameWrap-Wrap-Position')}>{position}</div>
            </div>
            <div className={cx('UserItem-Left-ContentsWrap-NameWrap-Wrap-Text')}>{text}</div>
          </div>
        </div>
      </div>

      <div className={cx('UserItem-JoinedAt')}>{calculateTime(date)}</div>
    </Link>
  );
};

export default UserItem;
