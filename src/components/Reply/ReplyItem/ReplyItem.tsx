import { useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IToken, IUser } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import { calculateTime } from 'lib/TimeCounting';
import ReplyFormContainer from 'containers/Reply/ReplyForm';
import { useRecoilValue } from 'recoil';
import { modifyReplyState } from 'atom/reply';

const style = require('./ReplyItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ReplyItemProps {
  idx: number;
  contents: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  user: IUser;
  commentIdx: number;
  onClickModifyReply: (idx: number, contents: string) => void;
  onChangeIsReplyWrite: () => void;
  requestDeleteReply: (replyIdx: number) => Promise<void>;
}

const ReplyItem = ({
  idx,
  contents,
  createdAt,
  updatedAt,
  user,
  commentIdx,
  onClickModifyReply,
  onChangeIsReplyWrite,
  requestDeleteReply,
}: ReplyItemProps): JSX.Element => {
  const myInfo: IToken = useMemo(() => getMyInfo(), []);
  const modifyObject = useRecoilValue(modifyReplyState);

  return (
    <div className={cx('ReplyItem')}>
      <div className={cx('ReplyItem-TopInfo')}>
        <div className={cx('ReplyItem-TopInfo-Left')}>
          <img
            src={user.avatar}
            className={cx('ReplyItem-TopInfo-Left-Profile')}
            alt='avatar'
          />

          <div className={cx('ReplyItem-TopInfo-Left-UserTime')}>
            <div className={cx('ReplyItem-TopInfo-Left-UserTime-User')}>
              {user.name}
            </div>
            
            <div className={cx('ReplyItem-TopInfo-Left-UserTime-Time')}>
              {calculateTime(createdAt)}
              <span>{updatedAt && '(수정됨)'}</span>
            </div>
          </div>
        </div>

        {
          myInfo && myInfo.idx === user.idx &&
          <div className={cx('ReplyItem-TopInfo-Right')}>
            <span onClick={() => onClickModifyReply(idx, contents)}>수정</span>
            <span
              className={cx('ReplyItem-TopInfo-Right-Delete')}
              onClick={() => requestDeleteReply(idx)}
            >
              삭제
            </span>
          </div>
        }
      </div>

      <div className={cx('ReplyItem-Contents')}>{contents}</div>
      {
        modifyObject !== null &&
        modifyObject.idx === idx &&
        <ReplyFormContainer
          commentIdx={commentIdx}
          onChangeIsReplyWrite={onChangeIsReplyWrite}
        />
      }
    </div>
  );
};

export default ReplyItem;
