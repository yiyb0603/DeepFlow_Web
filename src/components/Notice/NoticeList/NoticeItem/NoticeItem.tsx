import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { calculateTime } from 'lib/TimeCounting';
import { IUser } from 'types/user.types';
import NoticeCategory from './NoticeCategory';

const style = require('./NoticeItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoticeItemProps {
  idx: number;
  order: number;
  title: string;
  user: IUser;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  viewCount: number;
}

const NoticeItem = ({
  idx,
  order,
  title,
  user,
  createdAt,
  updatedAt,
  viewCount,
}: NoticeItemProps): JSX.Element => {
  const timeText: string = useMemo(() => {
    return calculateTime(createdAt) + (updatedAt !== null ? '(수정됨)' : '');
  }, [createdAt, updatedAt]);

  return (
    <Link
      to={`/notice/${idx}`}
      className={cx('NoticeItem')}
    >
      <div className={cx('NoticeItem-Left')}>
        <div className={cx('NoticeItem-Left-Order')}>{order}</div>
        <NoticeCategory />
        <div className={cx('NoticeItem-Left-Title')}>{title}</div>
      </div>

      <div className={cx('NoticeItem-Right')}>
        <div className={cx('NoticeItem-Right-TimeText')}>{timeText}</div>
        <div className={cx('NoticeItem-Right-ViewWrapper')}>
          <AiOutlineEye className={cx('NoticeItem-Right-ViewWrapper-Icon')} />
          <span>{viewCount}</span>
        </div>
      </div>
    </Link>
  );
}

export default NoticeItem;