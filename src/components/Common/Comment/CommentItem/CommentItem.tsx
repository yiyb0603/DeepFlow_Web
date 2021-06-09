import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { commentIdxState } from 'lib/recoil/atom/reply';
import calculateTime from 'lib/calculateTime';
import { EComment } from 'lib/enum/comment';
import { IToken, IUser } from 'types/user.types';
import { ICommentEmoji } from 'types/commentEmoji.types';
import { IReply } from 'types/reply.types';
import { getMyInfo } from 'util/getMyInfo';
import useIsReplyWrite from 'hooks/reply/useIsReplyWrite';
import EmojiToggle from 'components/Emoji/EmojiToggle';
import EmojiItem from 'components/Emoji/EmojiItem';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';
import CommentForm from '../CommentForm';
import ToggleReply from '../../../Comment/ToggleReply';

const style = require('./CommentItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentItemProps {
  idx: number;
  contents: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  user: IUser;
  replies?: IReply[];
  emojies?: ICommentEmoji[];
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
  emojies,
  onModifyClick,
  requestDeleteComment,
}: CommentItemProps) => {
  const myInfo: IToken = useMemo(() => getMyInfo(), []);
  const writeCommentIdx: number = useRecoilValue<number>(commentIdxState);

  const { isReplyWrite, onChangeIsReplyWrite } = useIsReplyWrite();

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

      <div className={cx('CommentItem-Contents')}>
        <MarkdownRender contents={contents} />
      </div>
      <div className={cx('CommentItem-Emojies')}>
        {
          emojies && emojies.map(({ emoji, users }: ICommentEmoji, key: number) => (
            <EmojiItem
              key={key}
              count={users.length}
              emoji={emoji}
              users={users}
              commentIdx={idx}
            />
          ))
        }
        <EmojiToggle
          commentIdx={idx}
          emojies={emojies!}
        />
      </div>

      {
        replies &&
        <ToggleReply
          commentIdx={idx}
          replies={replies}
          isReplyWrite={isReplyWrite}
          onChangeIsReplyWrite={onChangeIsReplyWrite}
        >
          {
            (isReplyWrite && writeCommentIdx === idx) &&
            <CommentForm
              commentIdx={idx}
              type={EComment.REPLY}
              onChangeIsReplyWrite={onChangeIsReplyWrite}
            />
          }
        </ToggleReply>
      }
    </div>
  );
};

export default CommentItem;
