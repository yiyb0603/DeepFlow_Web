import { useState, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { calculateTime } from 'lib/TimeCounting';
import { IToken, IUser } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import ToggleReply from '../../../Comment/ToggleReply';
import { IReply } from 'types/reply.types';
import { groupingState } from 'converter/groupingState';

const style = require('./CommentItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentItemProps {
  idx: number;
  contents: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  user: IUser;
  replies?: IReply[];
  onModifyClick: (idx: number, contents: string) => void;
  requestDeleteComment: (commentIdx: number) => void;
}

const CommentItem = ({
  idx,
  contents,
  createdAt,
  updatedAt,
  user,
  replies,
  onModifyClick,
  requestDeleteComment,
}: CommentItemProps) => {
  const myInfo: IToken = useMemo(() => getMyInfo(), []);
  const [isShowReply, setIsShowReply] = useState<boolean>(false);

  const onChangeIsShowReply = useCallback((): void => {
    setIsShowReply((prevShowReply: boolean) => !prevShowReply);
  }, []);

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
            <div className={cx('CommentItem-TopInfo-Left-UserTime-User')}>
              {user.name}
            </div>
            
            <div className={cx('CommentItem-TopInfo-Left-UserTime-Time')}>
              {calculateTime(createdAt)}
              <span>{updatedAt && '(수정됨)'}</span>
            </div>
          </div>
        </div>

        {
          myInfo && myInfo.idx === user.idx &&
          <div className={cx('CommentItem-TopInfo-Right')}>
            <span onClick={() => onModifyClick(idx, contents)}>수정</span>
            <span
              className={cx('CommentItem-TopInfo-Right-Delete')}
              onClick={() => requestDeleteComment(idx)}
            >
              삭제
            </span>
          </div>
        }
      </div>

      <div className={cx('CommentItem-Contents')}>{contents}</div>
      {
        replies &&
        <ToggleReply
          commentIdx={idx}
          isShowReplyState={groupingState('isShowReply', isShowReply, onChangeIsShowReply)}
          replies={replies}
        />
      }
    </div>
  );
};

export default CommentItem;