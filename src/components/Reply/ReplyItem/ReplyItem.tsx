import { useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useRecoilValue } from 'recoil';
import { IToken, IUser } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import { calculateTime } from 'lib/TimeCounting';
import { modifyReplyState } from 'atom/reply';
import useReply from 'hooks/reply/useReply';
import { IReplyModify } from 'types/reply.types';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';
import CommentForm from 'components/Common/Comment/CommentForm';
import { EComment } from 'lib/enum/comment';

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
  onChangeIsReplyWrite: (isReplyWrite: boolean) => void;
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
}: ReplyItemProps): JSX.Element => {
  const { requestDeleteReply } = useReply(commentIdx);
  const myInfo: IToken = useMemo(() => getMyInfo(), []);
  const modifyObject = useRecoilValue<IReplyModify | null>(modifyReplyState);

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

      <div className={cx('ReplyItem-Contents')}>
        <MarkdownRender contents={contents} />
      </div>
      {
        modifyObject !== null &&
        modifyObject.idx === idx &&
        <CommentForm
          type={EComment.REPLY}
          commentIdx={commentIdx}
          onChangeIsReplyWrite={onChangeIsReplyWrite}
        />
      }
    </div>
  );
};

export default ReplyItem;
