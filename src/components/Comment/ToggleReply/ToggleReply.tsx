import { useCallback, useState } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { IReply, IReplyModify } from 'types/reply.types';
import { isShowReplyState, modifyReplyState, replyContents } from 'atom/reply';
import usePageParam from 'hooks/util/usePageParam';
import ReplyWriteButton from 'components/Reply/ReplyWriteButton';
import ReplyItem from 'components/Reply/ReplyItem';
import { EComment } from 'lib/enum/comment';
import CommentForm from 'components/Common/Comment/CommentForm';

const style = require('./ToggleReply.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ToggleReplyProps {
  commentIdx: number;
  replies: IReply[];
}

const ToggleReply = ({
  commentIdx,
  replies,
}: ToggleReplyProps): JSX.Element => {
  const questionIdx: number = usePageParam();

  const [isReplyWrite, setIsReplyWrite] = useState<boolean>(false);
  const [modifyReply, setModifyReply] = useRecoilState<IReplyModify | null>(modifyReplyState);
  const setContents: SetterOrUpdater<string> = useSetRecoilState<string>(replyContents);
  const [isShowReply, setIsShowReply] = useRecoilState<boolean>(isShowReplyState);

  const onChangeIsShowReply = useCallback((): void => {
    if (replies.length <= 0) {
      return;
    }

    setIsShowReply((prevShowReply: boolean) => !prevShowReply);
  }, [replies, setIsShowReply]);

  const onChangeIsReplyWrite = useCallback((isReplyWrite: boolean): void => {
    setIsReplyWrite(isReplyWrite);
    setContents('');
    setModifyReply(null);
  }, [setContents, setModifyReply]);

  const onClickModifyReply = useCallback((idx: number, contents: string): void => {
    setModifyReply({
      idx,
      contents,
      postIdx: questionIdx,
      commentIdx,
    });
    
    setContents(contents);
    setIsReplyWrite(false);
  }, [commentIdx, questionIdx, setContents, setModifyReply]);

  return (
    <>
      <div className={cx('ToggleReply')} onClick={onChangeIsShowReply}>
        {
          isShowReply ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />
        }
        <span className={cx('ToggleReply-Text')}>{replies.length}개의 답글</span>
      </div>

      {
        isShowReply &&
        replies.length > 0 && replies.map((reply: IReply) => {
          const { idx, contents, createdAt, updatedAt, user, fk_comment_idx } = reply;
          
          return (
            <ReplyItem
              key={idx}
              idx={idx}
              contents={contents}
              createdAt={createdAt}
              updatedAt={updatedAt}
              user={user}
              commentIdx={fk_comment_idx}
              onChangeIsReplyWrite={onChangeIsReplyWrite}
              onClickModifyReply={onClickModifyReply}
            />
          );
        })
      }

      {
        !isReplyWrite &&
        <ReplyWriteButton
          onChangeIsReplyWrite={onChangeIsReplyWrite}
        />
      }

      {
        (isReplyWrite && modifyReply === null) &&
        <CommentForm
          commentIdx={commentIdx}
          type={EComment.REPLY}
          onChangeIsReplyWrite={onChangeIsReplyWrite}
        />
      }
    </>
  );
};

export default ToggleReply;
